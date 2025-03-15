from web3 import Web3
import json
from ..models import Transaction


class TransactionService:
    def __init__(self, network):
        self.w3 = Web3(Web3.HTTPProvider(self._get_rpc(network)))
        with open("abis/DonationTracker.json") as f:
            self.abi = json.load(f)

        self.contract = self.w3.eth.contract(
            address=os.getenv(f"{network.upper()}_ADDRESS"), abi=self.abi
        )

    def _get_rpc(self, network):
        return {
            "sepolia": os.getenv("SEPOLIA_RPC"),
            "polygon": os.getenv("POLYGON_RPC"),
        }[network]

    def get_transactions(self, donor_address):
        event_filter = self.contract.events.DonationCreated.createFilter(
            fromBlock=0, argument_filters={"donor": donor_address}
        )
        return event_filter.get_all_entries()

    def calculate_impact(self, mission_id):
        mission_contract = self._get_mission_contract()
        target = mission_contract.functions.getTarget(mission_id).call()
        raised = mission_contract.functions.getRaised(mission_id).call()
        return (raised / target) * 100 if target > 0 else 0

    def update_transaction_status(self, donation_id, status):
        tx = self.contract.functions.updateDonationStatus(
            donation_id, status
        ).build_transaction(
            {
                "from": os.getenv("OPERATOR_WALLET"),
                "nonce": self.w3.eth.get_transaction_count(
                    os.getenv("OPERATOR_WALLET")
                ),
            }
        )

        signed_tx = self.w3.eth.account.sign_transaction(tx, os.getenv("OPERATOR_PK"))
        return self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
