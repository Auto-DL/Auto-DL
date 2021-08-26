from datetime import datetime
import sys

from .utils_tests import TestOTP

sys.path.append("..")

from tests.mocks import MockOS

mock_os_obj = MockOS()


def test_create(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    otp_test = TestOTP()
    otp = otp_test.create_otp()

    generted_otp = otp.create()
    second_genereted_otp = otp.create()

    collection = otp.collection
    username = otp.username

    otp1 = collection.find_one({"username": username})
    stored_otp = otp1.get("otp")
    assert stored_otp != generted_otp and stored_otp == second_genereted_otp


def test_find(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    otp_test = TestOTP()
    otp = otp_test.create_otp()

    username = otp.username
    collection = otp.collection

    otp.create()
    assert otp.find() == collection.find_one({"username": username})


def test_verify(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    otp_test = TestOTP()
    otp = otp_test.create_otp()

    collection = otp.collection
    username = otp.username

    otp.create()
    assert otp.verify(collection.find_one({"username": username}).get("otp")) == True
    otp.create()
    collection.update_one(
        {"username": username},
        {"$set": {"expire": datetime.now()}},
        upsert=False,
    )
    assert otp.verify(collection.find_one({"username": username}).get("otp")) == False


def test_delete(mocker):
    mock_os_obj.mock_mongodb_uri(mocker)
    otp_test = TestOTP()
    otp = otp_test.create_otp()

    collection = otp.collection
    username = otp.username

    otp.create()
    otp.delete()
    assert collection.find_one({"useraname": username}) == None
