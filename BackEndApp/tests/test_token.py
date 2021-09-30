import os
import sys
import pytest
from datetime import datetime

sys.path.append("..")

from authv1.auth import Token, DATE_FORMAT
from tests.mocks import MockOS, MockUser

mock_os_obj = MockOS()
user = MockUser()

setup = user.mock_user()


def test_create(mocker):
    mock_os_obj.mock_jwt_secret(mocker)
    setup_wrong = user.mock_none_user()

    token = Token(setup).create()
    assert token is not None

    token = Token(setup_wrong).create()
    assert token is None


def test_delete(mocker):
    mock_os_obj.mock_jwt_secret(mocker)

    token = Token(setup)
    token.create()
    token.delete()
    assert token.token is None and token.expire is None


def test_verify(mocker):
    mock_os_obj.mock_jwt_secret(mocker)

    token_obj = Token(setup)
    token = token_obj.create()
    token_obj.expire = token_obj.expire.strftime(DATE_FORMAT)
    assert token_obj.verify() == True

    token_obj = Token(setup)
    token = token_obj.create()
    token_obj.expire = token_obj.expire.strftime(DATE_FORMAT)
    token_obj.token = None
    assert token_obj.verify() == False

    token_obj = Token(setup)
    token = token_obj.create()
    token_obj.expire = datetime.now().strftime(DATE_FORMAT)
    assert token_obj.verify() == False
