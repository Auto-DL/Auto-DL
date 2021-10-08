from pymongo import MongoClient
import os

MONGODB_URI = os.getenv('MONGODB_URI')
def get_db_handle(db_name, host, port, username, password):

 client = MongoClient(host=MONGODB_URI,
                      port=int(27017),
                      username=username,
                      password=password
                     )
 db_handle = client['AutoDl'] 
 return db_handle, client
# def get_collection_handle(db_handle,collection_name):
#  return db_handle[collection_name] 