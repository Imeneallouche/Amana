async function main() {
  const SimulationContract = await ethers.getContractFactory(
    "SimulationContract"
  );
  const contract = await SimulationContract.deploy();
  await contract.deployed();
  console.log("SimulationContract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
