// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// BadgeNFT.sol

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract BadgeNFT is ERC1155, AccessControl {
    bytes32 public constant BADGE_MINTER = keccak256("BADGE_MINTER");

    struct Badge {
        string name;
        string description;
        uint256 threshold;
        string metadataURI;
    }

    uint256 public badgeCount;
    mapping(uint256 => Badge) public badges;
    mapping(address => mapping(uint256 => bool)) public earnedBadges;

    event BadgeCreated(uint256 indexed badgeId, string name, uint256 threshold);

    event BadgeAwarded(address indexed recipient, uint256 indexed badgeId);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(BADGE_MINTER, msg.sender);
    }

    function createBadge(
        string memory _name,
        string memory _description,
        uint256 _threshold,
        string memory _metadataURI
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        badgeCount++;
        badges[badgeCount] = Badge(
            _name,
            _description,
            _threshold,
            _metadataURI
        );
        emit BadgeCreated(badgeCount, _name, _threshold);
    }

    function awardBadge(
        address _recipient,
        uint256 _badgeId,
        uint256 _currentCount
    ) external onlyRole(BADGE_MINTER) {
        require(_badgeId <= badgeCount, "Invalid badge ID");
        require(!earnedBadges[_recipient][_badgeId], "Already earned");

        Badge memory badge = badges[_badgeId];
        require(_currentCount >= badge.threshold, "Threshold not met");

        _mint(_recipient, _badgeId, 1, "");
        earnedBadges[_recipient][_badgeId] = true;

        emit BadgeAwarded(_recipient, _badgeId);
    }

    function uri(
        uint256 _badgeId
    ) public view override returns (string memory) {
        require(_badgeId <= badgeCount, "Invalid badge ID");
        return badges[_badgeId].metadataURI;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
