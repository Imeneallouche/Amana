// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AchievementSystem is ERC721 {
    struct ImpactMetrics {
        uint256 missionsJoined;
        uint256 totalDonated;
        uint256 livesSaved;
        uint256 peopleFed;
        uint256 educationImpact;
    }

    struct Badge {
        string title;
        string description;
        uint256 threshold;
        string ipfsMedia;
    }

    mapping(address => ImpactMetrics) public userMetrics;
    mapping(uint256 => Badge) public badges;
    mapping(address => mapping(uint256 => bool)) public userBadges;

    uint256 public badgeCounter;
    address public missionContract;

    event BadgeEarned(address indexed user, uint256 badgeId);
    event MetricsUpdated(address indexed user, string category);

    constructor(address _missionContract) ERC721("ImpactBadges", "IBDG") {
        missionContract = _missionContract;
        _initializeBadges();
    }

    function _initializeBadges() private {
        _createBadge(
            "Life Saver",
            "Save 10+ lives through critical operations",
            10,
            "QmXyZ..."
        );
        _createBadge("Hope Bringer", "Feed 50+ people", 50, "QmAbC...");
    }

    function _createBadge(
        string memory title,
        string memory desc,
        uint256 threshold,
        string memory ipfsHash
    ) private {
        badges[badgeCounter] = Badge(title, desc, threshold, ipfsHash);
        badgeCounter++;
    }

    function updateMetrics(
        address user,
        string memory category,
        uint256 amount
    ) external {
        require(msg.sender == missionContract, "Unauthorized");

        if (keccak256(bytes(category)) == keccak256("missions")) {
            userMetrics[user].missionsJoined += amount;
        } else if (keccak256(bytes(category)) == keccak256("donation")) {
            userMetrics[user].totalDonated += amount;
        } else if (keccak256(bytes(category)) == keccak256("lives")) {
            userMetrics[user].livesSaved += amount;
            _checkBadges(user, 0, userMetrics[user].livesSaved);
        } else if (keccak256(bytes(category)) == keccak256("food")) {
            userMetrics[user].peopleFed += amount;
            _checkBadges(user, 1, userMetrics[user].peopleFed);
        }

        emit MetricsUpdated(user, category);
    }

    function _checkBadges(
        address user,
        uint256 badgeType,
        uint256 current
    ) private {
        Badge memory b = badges[badgeType];
        if (current >= b.threshold && !userBadges[user][badgeType]) {
            _mint(user, badgeType);
            userBadges[user][badgeType] = true;
            emit BadgeEarned(user, badgeType);
        }
    }

    function generateReportHash(
        string memory reportData
    ) external pure returns (bytes32) {
        return keccak256(abi.encodePacked(reportData));
    }
}
