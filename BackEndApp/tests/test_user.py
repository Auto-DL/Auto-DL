# unit tests for User class methods

import pytest
from .utils_tests import TestUser


def test_create():
    # No email attribute
    with pytest.raises(KeyError) as e:
        user = TestUser()
        mock_user = user.user_noEmail()
        mock_user.create()
    assert str(e.value) == "'Email is required'"

    # email already registered
    with pytest.raises(ValueError) as e:
        user = TestUser()
        mock_user = user.user_sameEmail()
        collection = mock_user.collection
        user_doc = {
            "username": "abc",
            "password": None,
            "first_name": "test",
            "last_name": "use",
            "email": "test_user@gmail.com",
            "is_verified": False,
        }
        collection.insert_one(user_doc)
        mock_user.create()
    assert str(e.value) == "Email invalid"

    # Invalid email signature
    with pytest.raises(ValueError) as e:
        user = TestUser()
        mock_user = user.user_invalidEmail()
        mock_user.create()
    assert str(e.value) == "Invalid email or email already exists"

    # username already exists
    with pytest.raises(ValueError) as e:
        user = TestUser()
        mock_user = user.user_sameUsername()
        collection = mock_user.collection
        user_doc = {
            "username": "abc",
            "password": None,
            "first_name": "test",
            "last_name": "use",
            "email": "test_user@gmail.com",
            "is_verified": False,
        }
        collection.insert_one(user_doc)
        mock_user.create()
    assert str(e.value) == "Invalid username or username already exists"

    # check if user is created
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    assert collection.find_one({"username": "test_user"}) is not None


def test_find():
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    assert mock_user.find() == collection.find_one({"username": "test_user"})
    assert mock_user.find(by_email=True) == collection.find_one(
        {"email": "test_user0@gmail.com"}
    )


def test_update():
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    mock_user.update(field_name="email", new_value="test@gmail.com")
    assert collection.find_one({"email": "test@gmail.com"}) is not None


def test_delete():
    user = TestUser()
    mock_user = user.user_test()
    collection = mock_user.collection
    mock_user.create()
    mock_user.delete()
    assert collection.find_one({"username": "test_user"}) is None
