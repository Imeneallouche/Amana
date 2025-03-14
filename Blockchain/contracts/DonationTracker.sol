// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationTracker {
    enum PaymentMethod { Ethereum, Paysera, BaridiMob, CCP }
    enum TxStage { Initialized, Validated, Included, Finalized }
    
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        PaymentMethod method;
        uint256 missionId;
        TxStage stage;
        uint256 timestamp;
    }
    
    mapping(bytes32 => Transaction) public transactions;
    bytes32[] public txHashes;
    
    event TransactionUpdated(bytes32 txHash, TxStage stage);
    
    function initTransaction(
        address _receiver,
        uint256 _amount,
        PaymentMethod _method,
        uint256 _missionId
    ) external payable returns (bytes32) {
        bytes32 txHash = keccak256(abi.encodePacked(
            block.timestamp, msg.sender, _receiver, _amount
        ));
        
        transactions[txHash] = Transaction({
            sender: msg.sender,
            receiver: _receiver,
            amount: _amount,
            method: _method,
            missionId: _missionId,
            stage: TxStage.Initialized,
            timestamp: block.timestamp
        });
        
        txHashes.push(txHash);
        emit TransactionUpdated(txHash, TxStage.Initialized);
        return txHash;
    }

    function updateStage(bytes32 txHash, TxStage newStage) external {
        require(transactions[txHash].sender == msg.sender, "Unauthorized");
        transactions[txHash].stage = newStage;
        emit TransactionUpdated(txHash, newStage);
    }
}