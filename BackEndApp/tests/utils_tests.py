import os
import mongomock

from tests.mocks import MockUser
from authv1.models import Session


class TestSession:
    @mongomock.patch(
        servers=(
            (
                os.getenv("MONGODB_URI"),
                27017,
            ),
        )
    )
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
