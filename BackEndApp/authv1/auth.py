import os
import jwt
import bcrypt
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()


class Token():

    def __init__(self, user, token=None, expire=None):
        self.user = user
        self.token = token
        self.expire = expire

    def create(self, time_delta=48):
        """
        time_delta: (int) In hours
        """
        secret = os.getenv("JWT_SECRET")
        self.expire = datetime.now() + datetime.timedelta(hours = time_delta)
        payload = {
            'username': self.user.username,
            'email': self.user.email,
            'expire': self.expire
        }
        self.token = jwt.encode(payload, secret, algorithm="HS256")
        print(self.token)
        return self.token


    def delete(self):
        self.token = None
        self.expire = None


    def verify(self):
        if self.token is None or self.expire < datetime.now():
            return False

        secret = os.getenv("JWT_SECRET")
        decoded = jwt.decode(self.token, secret, algorithms="HS256")
        if decoded.get('username') == self.user.username and \
           decoded.get('email') == self.user.email and \
           decoded.get('expire') == self.expire and \
           decoded.get('expire') >= datetime.now():
            return True

        return False
