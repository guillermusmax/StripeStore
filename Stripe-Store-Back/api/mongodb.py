from pymongo import MongoClient
from django.conf import settings

def get_mongodb_client():
    return MongoClient(settings.MONGODB_URI)

def get_database():
    client = get_mongodb_client()
    return client['stripe_store']

def get_collection(collection_name):
    db = get_database()
    return db[collection_name] 