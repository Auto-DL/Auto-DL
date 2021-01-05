import os
import jwt
import bcrypt
from datetime import datetime, timedelta
from dotenv import load_dotenv

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
        decoded['expire'] = datetime.strptime(decoded.get('expire'), DATE_FORMAT)

        if (
            decoded.get("username") == self.user.get("username")
            and decoded.get("email") == self.user.get("email")
            and decoded.get("expire") == self.expire
            and decoded.get("expire") >= datetime.now()
        ):
            return True

        return False
