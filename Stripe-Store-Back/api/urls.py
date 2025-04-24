from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('create-payment-intent/', views.create_payment_intent, name='create-payment-intent'),
    path('process-cart-payment/', views.process_cart_payment, name='process-cart-payment'),
    path('webhook/', views.webhook, name='webhook'),
] 