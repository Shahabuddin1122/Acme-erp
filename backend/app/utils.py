from pymongo import MongoClient
from django.conf import settings

# Initialize MongoDB client
client = MongoClient(settings.MONGO_CONNECTION)
db = client["ACME_ERP"]

# You can expose `db` here if you need to access it directly from views.
__all__ = ["db"]