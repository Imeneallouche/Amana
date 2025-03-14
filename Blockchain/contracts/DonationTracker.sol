// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DonationTracker {
    enum TransactionStatus {
        Pending,
        Validated,
        InEscrow,
        DeliveryInProgress,
        Completed
    }

    struct Donation {
        address donor;
        uint256 missionId;
        uint256 amount;
        uint256 createdAt;
        uint256 completedAt;
        TransactionStatus status;
        bytes32 txHash;
        string beneficiaryProofCID;
    }

    mapping(uint256 => Donation) public donations;
    uint256 public donationCounter;

    event DonationCreated(
        uint256 donationId,
        address indexed donor,
        uint256 missionId,
        bytes32 txHash
    );

    event DonationUpdated(
        uint256 donationId,
        TransactionStatus status,
        uint256 timestamp
    );

    // Create new donation record
    function createDonation(
        uint256 missionId,
        bytes32 txHash
    ) external payable returns (uint256) {
        uint256 donationId = donationCounter++;

        donations[donationId] = Donation({
            donor: msg.sender,
            missionId: missionId,
            amount: msg.value,
            createdAt: block.timestamp,
            completedAt: 0,
            status: TransactionStatus.Pending,
            txHash: txHash,
            beneficiaryProofCID: ""
        });

        emit DonationCreated(donationId, msg.sender, missionId, txHash);
        return donationId;
    }

    // Update donation status (callable by NGO)
    function updateDonationStatus(
        uint256 donationId,
        TransactionStatus newStatus
    ) external {
        Donation storage donation = donations[donationId];
        require(
            donation.status != TransactionStatus.Completed,
            "Already completed"
        );

        donation.status = newStatus;
        if (newStatus == TransactionStatus.Completed) {
            donation.completedAt = block.timestamp;
        }

        emit DonationUpdated(donationId, newStatus, block.timestamp);
    }

    // Record beneficiary proof
    function recordBeneficiaryProof(
        uint256 donationId,
        string calldata cid
    ) external {
        Donation storage donation = donations[donationId];
        require(
            donation.status == TransactionStatus.Completed,
            "Not completed"
        );
        donation.beneficiaryProofCID = cid;
    }
}
