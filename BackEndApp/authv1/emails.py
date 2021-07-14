class EmailTemplates:
    def __init__(self, user):
        self.user = user

    def verify_email(self, username, otp):
        subject = "Auto-DL Email Verification"
        msg = (
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
        return subject, msg

    def forgot_password(self, username, otp):
        subject = "Auto-DL Forgot Password"
        msg = (
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
        return subject, msg
