# User class objects for unit testing of User class
import sys
import os
import mongomock

sys.path.append("..")

from authv1.auth import OTP
from authv1.models import User
from authv1.models import Session
from tests.mocks import MockUser, MockOS

mock_os_obj = MockOS()


class TestUser:
    def user_test(self):
        collection = mongomock.MongoClient().db.collection
        user = User(username="test_user", password="test_pw")
        user.attributes = {
            "first_name": "test",
            "last_name": "user",
            "email": "test_user@gmail.com",
        }
        user.collection = collection
        return user

    def user_noEmail(self):
        collection = mongomock.MongoClient().db.collection
        user = User(username="test_user", password="test_pw")
        user.attributes = {
            "first_name": "test",
            "last_name": "user",
        }
        user.collection = collection
        return user

    def user_invalidEmail(self):
        collection = mongomock.MongoClient().db.collection
        user = User(username="test_user", password="test_pw")
        user.attributes = {
            "first_name": "test",
            "last_name": "user",
            "email": "test_user@.com",
        }
        user.collection = collection
        return user


class TestOTP:
    def create_otp(self):
        collection = mongomock.MongoClient().db.collection
        user = MockUser()
        mock_user = user.mock_user()

        otp_obj = OTP(mock_user)
        otp_obj.collection = collection
        return otp_obj


class TestSession:
    def create_session(self):
        collection = mongomock.MongoClient().db.collection
        user = MockUser()
        mock_user = user.mock_user()

        session_obj = Session(mock_user)
        session_obj.collection = collection
        return session_obj

    def create_none_session(self):
        collection = mongomock.MongoClient().db.collection
        user = MockUser()
        mock_none_user = user.mock_none_user()

        session_obj_none = Session(mock_none_user)
        session_obj_none.collection = collection
        return session_obj_none
