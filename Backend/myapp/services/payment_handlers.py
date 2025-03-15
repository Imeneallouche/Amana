from .blockchain_service import BlockchainService
from django.conf import settings
import requests


class PaymentProcessor:
    def __init__(self):
        self.blockchain = BlockchainService()

    def handle_donation(self, user, data):
        method = data["method"]
        amount = data["amount"]
        receiver = data["receiver"]
        mission = data.get("mission")

        if method == "ETH":
            return self._handle_ethereum(user, amount, receiver, mission)
        else:
            return self._handle_fiat(user, method, amount, receiver, mission)

    def _handle_ethereum(self, user, amount, receiver, mission):
        tx_hash = self.blockchain.init_transaction(
            user.wallet_address,
            receiver.wallet_address,
            amount,
            mission.id if mission else 0,
        )
        return {"tx_hash": tx_hash, "method": "ETH"}

    def _handle_fiat(self, user, method, amount, receiver, mission):
        # Integration with external APIs
        if method == "PSR":
            response = requests.post(settings.PAYSERA_API_URL, data={...})
        elif method == "BRM":
            response = requests.post(settings.BARIDIMOB_API_URL, data={...})

        return {"reference": response.json()["id"], "method": method}
