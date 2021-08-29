import sys
import os
import mongomock

sys.path.append("..")

from authv1.auth import OTP
from tests.mocks import MockUser, MockOS

mock_os_obj = MockOS()


class TestOTP:
    def create_otp(self):
        collection = mongomock.MongoClient().db.collection
        user = MockUser()
        mock_user = user.mock_user()

        otp_obj = OTP(mock_user)
        otp_obj.collection = collection
        return otp_obj
