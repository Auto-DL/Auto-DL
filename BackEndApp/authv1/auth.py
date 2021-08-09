import os
import jwt
import bcrypt
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv
import string

from .connector import connect

load_dotenv()

DATE_FORMAT = "%Y/%m/%d %H/%M/%S"


class Token:
    def __init__(self, user, token=None, expire=None):
        self.user = user
        self.token = token
        self.expire = expire

    def create(self, time_delta=48):
        """
        time_delta: (int) In hours
        """
        if self.user is None:
            return None

        secret = os.getenv("JWT_SECRET")
        self.expire = datetime.now() + timedelta(hours=time_delta)

        payload = {
            "username": self.user.get("username"),
            "email": self.user.get("email"),
            "expire": self.expire.strftime(DATE_FORMAT),
        }
        self.token = jwt.encode(payload, secret, algorithm="HS256")
        return self.token

    def delete(self):
        self.token = None
        self.expire = None

    def verify(self):

        self.expire = datetime.strptime(self.expire, DATE_FORMAT)
        if self.token is None or self.expire < datetime.now():
            return False

        secret = os.getenv("JWT_SECRET")
        decoded = jwt.decode(self.token, secret, algorithms="HS256")
        decoded["expire"] = datetime.strptime(decoded.get("expire"), DATE_FORMAT)

        if (
            decoded.get("username") == self.user.get("username")
            and decoded.get("email") == self.user.get("email")
            and decoded.get("expire") == self.expire
            and decoded.get("expire") >= datetime.now()
        ):
            return True

        return False


class OTP:
    def __init__(self, user, otp=None, expire=None, **kwargs):
        self.user = user
        self.username = user.get("username")
        self.otp = otp
        self.expire = expire
        self.db = connect()
        self.collection_name = kwargs.get("collection", "otp")
        self.collection = self.db[self.collection_name]
        self.attributes = kwargs

    def create(self, time_delta=5):
        try:
            """
            time_delta: (int) In minutes
            """
            if self.find():
                self.delete()
            self.expire = datetime.now() + timedelta(minutes=time_delta)
            self.otp = "".join(
                random.SystemRandom().choice(string.ascii_uppercase + string.digits)
                for _ in range(6)
            )
            doc_otp = {
                "otp": self.otp,
                "expire": self.expire,
                "username": self.user["username"],
            }
            self.collection.insert_one(doc_otp)
            return self.otp
        except Exception as e:
            return None

    def find(self):
        return self.collection.find_one({"username": self.username})

    def verify(self, otp_recieved):
        user_obj = self.find()
        stored_otp = user_obj.get("otp")
        otp_expire = user_obj.get("expire")
        self.delete()
        if otp_expire > datetime.now() and stored_otp == otp_recieved:
            return True
        return False

    def delete(self):
        self.collection.delete_one({"username": self.username})
