const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimulationContract", function () {
  let contract;
  let owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const SimulationContract = await ethers.getContractFactory(
      "SimulationContract"
    );
    contract = await SimulationContract.deploy();
  });

  it("Should complete successful simulation", async () => {
    const tx = await contract.startSimulation(1, "sepolia", false);
    const receipt = await tx.wait();
    const simId = receipt.events[0].args.simId;

    for (let i = 0; i < 4; i++) {
      await contract.advanceStage(simId);
    }

    const sim = await contract.simulations(simId);
    expect(sim.stage).to.equal(4); // FundsReleased
  });

  it("Should handle failed delivery", async () => {
    const tx = await contract.startSimulation(1, "polygon", true);
    const receipt = await tx.wait();
    const simId = receipt.events[0].args.simId;

    await contract.advanceStage(simId);
    await contract.advanceStage(simId);
    await contract.advanceStage(simId);

    const sim = await contract.simulations(simId);
    expect(sim.stage).to.equal(5); // Failed
  });
});
