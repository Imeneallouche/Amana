// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MissionRegistry {
    struct Mission {
        address owner;
        uint256 targetAmount;
        uint256 deadline;
        string description;
        string category;
        address[] beneficiaries;
        bool isActive;
    }

    mapping(uint256 => Mission) public missions;
    uint256 public missionCounter;

    event MissionCreated(uint256 missionId, address owner);
    event BeneficiaryAdded(uint256 missionId, address beneficiary);

    function createMission(
        uint256 _targetAmount,
        uint256 _deadline,
        string memory _description,
        string memory _category
    ) external returns (uint256) {
        uint256 missionId = missionCounter++;

        missions[missionId] = Mission({
            owner: msg.sender,
            targetAmount: _targetAmount,
            deadline: _deadline,
            description: _description,
            category: _category,
            beneficiaries: new address[](0),
            isActive: true
        });

        emit MissionCreated(missionId, msg.sender);
        return missionId;
    }

    function addBeneficiary(uint256 missionId, address beneficiary) external {
        require(missions[missionId].owner == msg.sender, "Not mission owner");
        require(missions[missionId].isActive, "Mission inactive");

        missions[missionId].beneficiaries.push(beneficiary);
        emit BeneficiaryAdded(missionId, beneficiary);
    }

    function getBeneficiaries(
        uint256 missionId
    ) external view returns (address[] memory) {
        return missions[missionId].beneficiaries;
    }
}
