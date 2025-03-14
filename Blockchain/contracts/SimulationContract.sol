// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimulationContract {
    enum SimulationStage {
        Initiated,
        Validated,
        FundsLocked,
        DeliveryConfirmed,
        FundsReleased,
        Failed
    }

    struct Simulation {
        address user;
        uint256 missionId;
        SimulationStage stage;
        uint256 timestamp;
        bool success;
        string network;
        string feedbackCID;
    }

    mapping(uint256 => Simulation) public simulations;
    uint256 public simulationCounter;

    event SimulationStarted(uint256 simId, uint256 missionId, string network);
    event StageUpdated(uint256 simId, SimulationStage stage);
    event SimulationCompleted(uint256 simId, bool success, string feedbackCID);

    // Simulate transaction flow with configurable delays
    function startSimulation(
        uint256 missionId,
        string memory network,
        bool shouldFail
    ) external returns (uint256) {
        uint256 simId = simulationCounter++;

        simulations[simId] = Simulation({
            user: msg.sender,
            missionId: missionId,
            stage: SimulationStage.Initiated,
            timestamp: block.timestamp,
            success: !shouldFail,
            network: network,
            feedbackCID: ""
        });

        emit SimulationStarted(simId, missionId, network);
        return simId;
    }

    function advanceStage(uint256 simId) external {
        Simulation storage sim = simulations[simId];
        require(
            sim.stage != SimulationStage.FundsReleased,
            "Already completed"
        );

        if (sim.stage == SimulationStage.DeliveryConfirmed && !sim.success) {
            sim.stage = SimulationStage.Failed;
        } else {
            sim.stage = SimulationStage(uint(sim.stage) + 1);
        }

        emit StageUpdated(simId, sim.stage);

        if (
            sim.stage == SimulationStage.FundsReleased ||
            sim.stage == SimulationStage.Failed
        ) {
            emit SimulationCompleted(simId, sim.success, sim.feedbackCID);
        }
    }

    function addFeedback(uint256 simId, string memory cid) external {
        simulations[simId].feedbackCID = cid;
    }
}
