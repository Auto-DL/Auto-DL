from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from BackEndApp.settings import EMAIL_HOST_USER


class Email_Templates:
    def __init__(self, user, request):
        self.user = user
        self.request = request

    def forgot_password(self, username, email):
        print("called")
        subject = "Auto-DL Request for Password Reset "
        domain = get_current_site(self.request).domain
        link = "http://" + domain + "/auth/password_reset/"
        msg = (
            "You ("
            + username
            + ") requested a password reset. Click here to reset your password "
            + link
            + username
            + "/"
        )
        send_mail(subject, msg, EMAIL_HOST_USER, [email])
        message = "Email Sent."
        return message
