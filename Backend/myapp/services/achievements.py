from web3 import Web3
import json
from ..models import UserAchievement, Badge


class AchievementService:
    def __init__(self, network):
        self.w3 = Web3(Web3.HTTPProvider(self._get_rpc(network)))
        with open("abis/AchievementSystem.json") as f:
            self.abi = json.load(f)

        self.contract = self.w3.eth.contract(
            address=os.getenv(f"ACHIEVEMENT_{network.upper()}_ADDR"), abi=self.abi
        )

    def get_user_metrics(self, address):
        raw = self.contract.functions.userMetrics(address).call()
        return {
            "missions": raw[0],
            "donated": raw[1],
            "lives_saved": raw[2],
            "people_fed": raw[3],
            "education": raw[4],
        }

    def get_badges(self, address):
        badges = []
        total = self.contract.functions.badgeCounter().call()

        for i in range(total):
            if self.contract.functions.userBadges(address, i).call():
                badge_data = self.contract.functions.badges(i).call()
                badges.append(
                    {
                        "id": i,
                        "title": badge_data[0],
                        "description": badge_data[1],
                        "media": f"ipfs://{badge_data[3]}",
                    }
                )

        return badges

    def generate_report(self, user):
        metrics = self.get_user_metrics(user.wallet)
        # Generate PDF and visualization
        report_data = json.dumps(metrics)
        report_hash = self.contract.functions.generateReportHash(report_data).call()

        # Store to IPFS
        ipfs_hash = ipfs_client.add(report_data)

        return ImpactReport.objects.create(
            user=user,
            report_hash=report_hash.hex(),
            pdf_url=f"https://ipfs.io/ipfs/{ipfs_hash}",
            visualization_data=generate_heatmap(metrics),
        )
