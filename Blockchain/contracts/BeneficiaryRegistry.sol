// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BeneficiaryRegistry {
    struct Beneficiary {
        address wallet;
        uint256 missionId;
        bool verified;
        string needs;
        string locationHash;
    }

    mapping(address => Beneficiary) public beneficiaries;
    address[] public allBeneficiaries;

    event BeneficiaryRegistered(address beneficiary, uint256 missionId);
    event BeneficiaryVerified(address beneficiary);

    function registerBeneficiary(
        uint256 missionId,
        string memory _needs,
        string memory _locationHash
    ) external {
        beneficiaries[msg.sender] = Beneficiary({
            wallet: msg.sender,
            missionId: missionId,
            verified: false,
            needs: _needs,
            locationHash: _locationHash
        });
        allBeneficiaries.push(msg.sender);
        emit BeneficiaryRegistered(msg.sender, missionId);
    }

    function verifyBeneficiary(address beneficiary) external {
        require(
            msg.sender == beneficiaries[beneficiary].wallet,
            "Unauthorized"
        );
        beneficiaries[beneficiary].verified = true;
        emit BeneficiaryVerified(beneficiary);
    }
}
