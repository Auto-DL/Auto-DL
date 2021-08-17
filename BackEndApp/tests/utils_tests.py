import sys
import os
import mongomock

sys.path.append("..")

from authv1.auth import OTP
from tests.mocks import MockUser


class TestOTP:
    @mongomock.patch(
        servers=(
            (
                os.getenv("MONGODB_URI"),
                27017,
            ),
        )
    )
    def mock_otp(self):
        collection = mongomock.MongoClient().db.collection
        user = MockUser()
        mock_user = user.mock_user()

        otp_obj = OTP(mock_user)
        otp_obj.collection = collection
        return otp_obj
