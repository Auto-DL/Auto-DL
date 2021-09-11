import os
import sys

sys.path.append("..")


class MockOS:
    def mock_jwt_secret(self, mocker):
        mocker.patch.dict(os.environ, {"JWT_SECRET": "secret"})

    def mock_mongodb_uri(self, mocker):
        mocker.patch.dict(os.environ, {"MONGODB_URI": "some_uri"})


class MockUser:
    def mock_user(self):
        user = {"username": "trial", "email": "trial@gmail.com"}
        return user

    def mock_none_user(self):
        return None

    def mock_wrong_user(self):
        user = {"username": None, "email": None}
        return user
