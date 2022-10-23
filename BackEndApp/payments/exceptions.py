class Exception(Exception):
    pass


class PaymentFailed(Exception):
    def __init__(self, message) -> None:
        self.message = message
        super().__init__(f"Payment Failed due to : {message}")


class PaymentVerificationFailed(Exception):
    def __init__(self, message) -> None:
        self.message = message
        super().__init__(f"Payment Verification Failed due to : {message}")
