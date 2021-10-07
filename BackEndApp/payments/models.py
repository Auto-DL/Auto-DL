from django.db import models

# Create your models here.
class Donation(models.Model):
    donation_amount = models.CharField(max_length=100)
    # order_amount = models.CharField(max_length=25)
    donation_payment_id = models.CharField(max_length=100)
    isPaid = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.donation_amount