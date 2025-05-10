// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// VerificationSystem.sol

import "@openzeppelin/contracts/access/Ownable.sol";

contract VerificationSystem is Ownable {
    enum VerificationStatus {
        Pending,
        BeneficiaryConfirmed,
        NGOVerified,
        Completed
    }

    struct Verification {
        uint256 missionId;
        address beneficiary;
        address ngo;
        VerificationStatus status;
        uint256 initiatedAt;
        uint256 confirmedAt;
        uint256 verifiedAt;
        string proofCID;
    }

    mapping(uint256 => mapping(address => Verification)) public verifications;
    mapping(address => bool) public registeredNGOs;

    event VerificationInitiated(
        uint256 indexed missionId,
        address indexed beneficiary,
        address indexed ngo
    );

    event ReceiptConfirmed(
        uint256 indexed missionId,
        address indexed beneficiary,
        string proofCID
    );

    event VerificationCompleted(
        uint256 indexed missionId,
        address indexed beneficiary
    );

    modifier onlyNGO() {
        require(registeredNGOs[msg.sender], "Caller is not registered NGO");
        _;
    }

    function registerNGO(address _ngo) external onlyOwner {
        registeredNGOs[_ngo] = true;
    }

    function initiateVerification(
        uint256 _missionId,
        address _beneficiary,
        string calldata _initialProof
    ) external onlyNGO {
        Verification storage v = verifications[_missionId][_beneficiary];
        require(
            v.status == VerificationStatus.Pending,
            "Verification already exists"
        );

        v.missionId = _missionId;
        v.beneficiary = _beneficiary;
        v.ngo = msg.sender;
        v.status = VerificationStatus.Pending;
        v.initiatedAt = block.timestamp;
        v.proofCID = _initialProof;

        emit VerificationInitiated(_missionId, _beneficiary, msg.sender);
    }

    function confirmReceipt(
        uint256 _missionId,
        string calldata _qrProof
    ) external {
        Verification storage v = verifications[_missionId][msg.sender];
        require(v.status == VerificationStatus.Pending, "Invalid status");
        require(v.beneficiary == msg.sender, "Not the beneficiary");

        v.status = VerificationStatus.BeneficiaryConfirmed;
        v.confirmedAt = block.timestamp;
        v.proofCID = _qrProof;

        emit ReceiptConfirmed(_missionId, msg.sender, _qrProof);
    }

    function completeVerification(
        uint256 _missionId,
        address _beneficiary
    ) external onlyNGO {
        Verification storage v = verifications[_missionId][_beneficiary];
        require(
            v.status == VerificationStatus.BeneficiaryConfirmed,
            "Not confirmed"
        );
        require(v.ngo == msg.sender, "Unauthorized NGO");

        v.status = VerificationStatus.Completed;
        v.verifiedAt = block.timestamp;

        emit VerificationCompleted(_missionId, _beneficiary);
    }

    function getVerificationStatus(
        uint256 _missionId,
        address _beneficiary
    ) external view returns (VerificationStatus) {
        return verifications[_missionId][_beneficiary].status;
    }
}
