import os
import re
import bcrypt
from authv1 import connector


class User():
    def __init__(self, username, password, **kwargs):
        self.username = username
        self.password = password
        self.db = connector.connect()
        self.collection_name = kwargs.get('collection', 'user')
        self.collection = self.db[self.collection_name]
        self.attributes = kwargs


    def __str__(self):
        return str(self.username)


    def create(self):
        print(self.attributes)
        if 'email' not in self.attributes:
            raise KeyError("Email is required")

        if self.find(by_email=True):
            raise ValueError("Email invalid")

        regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
        if (not re.search(regex, self.attributes.get('email'))):
            raise ValueError("Email ivalid")

        if self.find():
            raise ValueError("Username invalid")

        hashedpw = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt())

        user_document = {
            'username': self.username, 
            'password': hashedpw,
            'first_name': self.attributes.get('first_name',''),
            'last_name': self.attributes.get('last_name',''),
            'email': self.attributes.get('email')
        }
        return self.collection.insert_one(user_document)


    def find(self, by_email=False):
        """ Returns user object is exists else returns None."""

        if by_email:
            return self.collection.find_one({
            'email': self.attributes.get('email')
        })

        return self.collection.find_one({
            'username': self.username
        })


    def update(self, field_name, new_value, **kwargs):
        try:
            self.collection.update({
                "username": self.username
                }, {
                    "$set": {
                        field_name: new_value
                    }
                }, upsert=False)
            return 0, None
        except Exception as e:
            return 1, Exception        


    def delete(self):
        
        delete_result = self.collection.delete_one({
            'username': self.username
        })
        return delete_result.acknowledged


    def isauthenticated(self):
        pass
        # create a new table for token storing
        # check if token for this guy exits
        # do stuff