# unit tests for EmailTemplates class method

import pytest
import os

from tests.mocks import MockUser
from authv1.emails import EmailTemplates


def test_verify_email_pass():
    user = MockUser().mock_user()
    email = EmailTemplates(user)
    username = user["username"]
    otp = "ABC123"
    subject, msg = email.verify_email(username, otp)
    assert subject == "Auto-DL Email Verification"

    validate_msg = (
        "Welcome "
        + username
        + ",\n"
        + "\nWe are excited to have you get started at Auto-DL. Please verify your email address using the OTP provided below.\n"
        + "OTP for Email Verification: "
        + otp
        + ".\n"
        + "If you do have any futher queries, kindly contact us via email (info.autodl@gmail.com).\n"
        + "\nIf you did not initiate this verification, please ignore this email.\n"
        + "\nRegards,\nThe Auto-DL Team."
    )
    assert msg == validate_msg


def test_verify_email_fail():
    wrong_user = MockUser().mock_wrong_user()
    email = EmailTemplates(wrong_user)
    otp = "ABC123"
    username = wrong_user["username"]
    with pytest.raises(TypeError):
        email.verify_email(username, otp)


def test_forgot_password_pass():
    user = MockUser().mock_user()
    email = EmailTemplates(user)
    username = user["username"]
    otp = "ABC123"
    subject, msg = email.forgot_password(username, otp)
    assert subject == "Auto-DL Forgot Password"

    validate_msg = (
        "Hello "
        + username
        + ",\n"
        + "\nWe have received a request to update the password of your Auto-DL account. \n"
        + "OTP for updating your password: "
        + otp
        + ".\n"
        + "If you did not request this update, please let us know via email (info.autodl@gmail.com)."
        + "\nRegards,\nThe Auto-DL Team."
    )
    assert msg == validate_msg


def test_forgot_password_fail():
    wrong_user = MockUser().mock_wrong_user()
    email = EmailTemplates(wrong_user)
    otp = "ABC123"
    username = wrong_user["username"]
    with pytest.raises(TypeError):
        email.forgot_password(username, otp)
