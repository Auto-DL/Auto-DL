import os
import sys
import mongomock
import pytest

sys.path.append("..")

from authv1.auth import OTP


class MockOS:
    def mock_jwt_secret(self, mocker):
        mocker.patch.dict(os.environ, {"JWT_SECRET": "secret"})


class MockUser:
    def mock_user(self):
        user = {"username": "trial", "email": "trial@gmail.com"}
        return user

    def mock_none_user(self):
        return None

    def mock_wrong_user(self):
        user = {"username": None, "email": None}
        return user


class MockOTP:
    def mock_otp(self, mocker):
        user = MockUser()
        mock_user = user.mock_user()

        mock_os = MockOS()
        mock_os.mock_jwt_secret(mocker)

        otp_obj = OTP(mock_user)
        return otp_obj
