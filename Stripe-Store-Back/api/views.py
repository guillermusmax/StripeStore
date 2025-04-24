from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import stripe
from .mongodb import get_collection
from bson import ObjectId

stripe.api_key = settings.STRIPE_SECRET_KEY

class ProductViewSet(viewsets.ViewSet):
    def list(self, request):
        products = list(get_collection('products').find())
        # Convert ObjectId to string for JSON serialization
        for product in products:
            product['_id'] = str(product['_id'])
        return Response(products)

    def create(self, request):
        product = request.data
        result = get_collection('products').insert_one(product)
        product['_id'] = str(result.inserted_id)
        return Response(product, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        product = get_collection('products').find_one({'_id': ObjectId(pk)})
        if product:
            product['_id'] = str(product['_id'])
            return Response(product)
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_payment_intent(request):
    try:
        data = request.data
        product = get_collection('products').find_one({'_id': ObjectId(data['product_id'])})
        
        if not product:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=int(float(product['price']) * 100),  # Convert to cents
            currency='usd',
            metadata={
                'product_id': str(product['_id']),
                'customer_email': data.get('email', '')
            }
        )

        # Create order
        order = {
            'product_id': str(product['_id']),
            'customer_email': data.get('email', ''),
            'amount': float(product['price']),
            'status': 'pending',
            'stripe_payment_intent_id': intent.id
        }
        result = get_collection('orders').insert_one(order)
        order['_id'] = str(result.inserted_id)

        return Response({
            'clientSecret': intent.client_secret,
            'order_id': order['_id']
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def process_cart_payment(request):
    try:
        data = request.data
        cart_items = data.get('items', [])
        customer_email = data.get('email', '')
        
        if not cart_items:
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate total amount
        total_amount = sum(item['price'] * item['quantity'] for item in cart_items)
        
        # Create a PaymentIntent with the total amount
        intent = stripe.PaymentIntent.create(
            amount=int(total_amount * 100),  # Convert to cents
            currency='usd',
            metadata={
                'customer_email': customer_email,
                'cart_items': str(cart_items)  # Store cart items in metadata
            }
        )

        # Create order
        order = {
            'items': cart_items,
            'customer_email': customer_email,
            'total_amount': total_amount,
            'status': 'pending',
            'stripe_payment_intent_id': intent.id
        }
        result = get_collection('orders').insert_one(order)
        order['_id'] = str(result.inserted_id)

        return Response({
            'clientSecret': intent.client_secret,
            'order_id': order['_id'],
            'total_amount': total_amount
        })
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        return Response({'error': 'Invalid payload'}, status=status.HTTP_400_BAD_REQUEST)
    except stripe.error.SignatureVerificationError as e:
        return Response({'error': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        get_collection('orders').update_one(
            {'stripe_payment_intent_id': payment_intent['id']},
            {'$set': {'status': 'completed'}}
        )

    return Response({'status': 'success'})
