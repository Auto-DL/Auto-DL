from django.core.mail import send_mail
from BackEndApp.settings import EMAIL_HOST_USER


class Email_Templates:
    def __init__(self, user, request):
        self.user = user
        self.request = request

    def update_password(self, username, email, otp):
        subject = "Auto-DL Request to Update Password"
        msg = (
            "You ("
            + username
            + ") requested to update your password. Click here to reset your password "
            + "Your OTP is: "
            + otp
        )
        send_mail(subject, msg, EMAIL_HOST_USER, [email])
        message = "Email Sent."
        return message

    def verify_email(self, username, email, otp):
        subject = "Auto-DL Email Verification"
        msg = "Hello " + username + "." + "Your OTP for Email Verification is: " + otp
        send_mail(subject, msg, EMAIL_HOST_USER, [email])
        message = "Email Sent."
        return message
