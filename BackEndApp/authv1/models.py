import os
import re
import bcrypt
from authv1 import connector
from authv1.auth import Token

DATE_FORMAT = "%Y/%m/%d %H/%M/%S"


class User:
    def __init__(self, username, password, **kwargs):
        self.username = username
        self.password = password
        self.is_verified = False
        self.db = connector.connect()
        self.collection_name = kwargs.get("collection", "user")
        self.collection = self.db[self.collection_name]
        self.attributes = kwargs

    def __str__(self):
        return str(self.username)

    def create(self):
        if "email" not in self.attributes:
            raise KeyError("Email is required")

        if self.find(by_email=True):
            raise ValueError("Email invalid")

        regex = "^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$"
        if not re.search(regex, self.attributes.get("email").lower()):
            raise ValueError("Invalid email or email already exists")

        if self.find():
            raise ValueError("Invalid username or username already exists")

        hashed_password = bcrypt.hashpw(self.password.encode("utf-8"), bcrypt.gensalt())

        user_document = {
            "username": self.username,
            "password": hashed_password,
            "first_name": self.attributes.get("first_name", ""),
            "last_name": self.attributes.get("last_name", ""),
            "email": self.attributes.get("email").lower(),
            "is_verified": False,
        }
        return self.collection.insert_one(user_document)

    def find(self, by_email=False):
        """Returns user object is exists else returns None."""
        if by_email:
            return self.collection.find_one({"email": self.attributes.get("email")})

        return self.collection.find_one({"username": self.username})

    def update(self, field_name, new_value, **kwargs):
        try:
            self.collection.update(
                {"username": self.username},
                {"$set": {field_name: new_value}},
                upsert=False,
            )
            return 0, None
        except Exception as e:
            return 1, "Could not update."

    def delete(self):

        delete_result = self.collection.delete_one({"username": self.username})
        return delete_result.acknowledged

    def isauthenticated(self):
        pass
        # create a new table for token storing
        # check if token for this guy exits
        # do stuff


class Session:
    def __init__(self, user, **kwargs):
        self.user = user
        self.db = connector.connect()
        self.collection_name = kwargs.get("collection", "session")
        self.collection = self.db[self.collection_name]
        self.attributes = kwargs

    def create(self):
        token_obj = Token(self.user)
        token = token_obj.create()

        if token is None:
            return None

        token = str(token, "utf-8")
        expire = token_obj.expire.strftime(DATE_FORMAT)

        session_document = {"token": token, "expire": expire, "user": self.user}
        try:
            self.collection.insert_one(session_document)
            return token
        except:
            return None

    def delete(self, token):
        if not self.verify(token):
            return False

        if self.user is None:
            return False

        delete_result = self.collection.delete_one({"token": token})
        return delete_result.acknowledged

    def find(self, token):
        return self.collection.find_one({"token": token})

    def verify(self, token):
        session_obj = self.find(token)

        if session_obj is None:
            return False

        user = session_obj.get("user")
        expire = session_obj.get("expire")
        token = session_obj.get("token")

        token_obj = Token(user, token, expire)
        return token_obj.verify()
