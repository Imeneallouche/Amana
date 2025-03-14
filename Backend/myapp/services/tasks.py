from celery import shared_task
from web3 import Web3
from ..models import UserAchievement, Badge


@shared_task
def listen_achievement_events(network):
    w3 = Web3(Web3.HTTPProvider(os.getenv(f"{network.upper()}_RPC")))
    contract = w3.eth.contract(
        address=os.getenv(f"ACHIEVEMENT_{network.upper()}_ADDR"), abi=AchievementABI
    )

    event_filter = contract.events.MetricsUpdated.create_filter(fromBlock="latest")

    while True:
        for event in event_filter.get_new_entries():
            handle_metrics_update(event)


def handle_metrics_update(event):
    user = User.objects.get(wallet=event.args.user)
    metrics = AchievementService().get_user_metrics(user.wallet)

    UserAchievement.objects.update_or_create(
        user=user,
        defaults={
            "missions_joined": metrics["missions"],
            "total_donated": metrics["donated"],
            "lives_saved": metrics["lives_saved"],
            "people_fed": metrics["people_fed"],
            "education_impact": metrics["education"],
        },
    )


@shared_task
def handle_badge_earned(event):
    badge_id = event.args.badgeId
    badge_data = contract.functions.badges(badge_id).call()

    Badge.objects.update_or_create(
        badge_id=badge_id,
        defaults={
            "title": badge_data[0],
            "description": badge_data[1],
            "threshold": badge_data[2],
            "ipfs_media": badge_data[3],
            "network": network,
        },
    )
