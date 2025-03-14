// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MissionRegistry.sol";
import "./BeneficiaryRegistry.sol";
import "./FiatBridge.sol";

contract DonationFlow {
    MissionRegistry public missionRegistry;
    BeneficiaryRegistry public beneficiaryRegistry;
    FiatBridge public fiatBridge;

    enum TransactionStage {
        Initiated,
        Validated,
        Included,
        Finalized
    }

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        TransactionStage stage;
        uint256 missionId;
        bytes32 fiatProof;
        uint256 timestamp;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCounter;

    constructor(
        address _missionRegistry,
        address _beneficiaryRegistry,
        address _fiatBridge
    ) {
        missionRegistry = MissionRegistry(_missionRegistry);
        beneficiaryRegistry = BeneficiaryRegistry(_beneficiaryRegistry);
        fiatBridge = FiatBridge(_fiatBridge);
    }

    function initiateDonation(
        uint256 missionId,
        uint256 amount,
        bytes32 fiatProof
    ) external payable {
        uint256 txId = transactionCounter++;

        transactions[txId] = Transaction({
            sender: msg.sender,
            receiver: missionRegistry.missions(missionId).owner,
            amount: amount,
            stage: TransactionStage.Initiated,
            missionId: missionId,
            fiatProof: fiatProof,
            timestamp: block.timestamp
        });
    }

    function finalizeToBeneficiary(uint256 txId, address beneficiary) external {
        Transaction storage transaction = transactions[txId];
        require(msg.sender == transaction.receiver, "Unauthorized");
        require(
            beneficiaryRegistry.beneficiaries(beneficiary).verified,
            "Beneficiary not verified"
        );

        transaction.stage = TransactionStage.Finalized;
    }
}
