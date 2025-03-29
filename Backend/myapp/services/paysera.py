import requests
from django.conf import settings


class PayseraGateway:
    def __init__(self):
        self.api_key = settings.PAYSERA_API_KEY
        self.base_url = settings.PAYSERA_BASE_URL

    def create_payment(self, amount, reference):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        data = {
            "amount": amount,
            "currency": "EUR",
            "reference": reference,
            "callback_url": f"{settings.BASE_URL}/paysera/callback",
        }
        response = requests.post(
            f"{self.base_url}/payments", json=data, headers=headers
        )
        return response.json()["payment_url"]

    def verify_payment(self, payment_id):
        # Implementation for payment verification
        pass
