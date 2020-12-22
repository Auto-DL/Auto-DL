import os
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

        #TODO: check email is valid
        #TODO: check email and username are unique
        #TODO: hash password

        user_document = {
            'username': self.username, 
            'password': self.password,
            'first_name': self.attributes.get('first_name',''),
            'last_name': self.attributes.get('last_name',''),
            'email': self.attributes.get('email')
        }
        return self.collection.insert_one(user_document)


    def find(self):
        """ Returns user object is exists else returns None."""
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
