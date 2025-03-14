async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy MissionRegistry
  const MissionRegistry = await ethers.getContractFactory("MissionRegistry");
  const missionRegistry = await MissionRegistry.deploy();
  await missionRegistry.deployed();

  // Deploy BeneficiaryRegistry
  const BeneficiaryRegistry = await ethers.getContractFactory(
    "BeneficiaryRegistry"
  );
  const beneficiaryRegistry = await BeneficiaryRegistry.deploy();
  await beneficiaryRegistry.deployed();

  // Deploy FiatBridge (with oracle address)
  const FiatBridge = await ethers.getContractFactory("FiatBridge");
  const fiatBridge = await FiatBridge.deploy(deployer.address);
  await fiatBridge.deployed();

  // Deploy DonationFlow with dependencies
  const DonationFlow = await ethers.getContractFactory("DonationFlow");
  const donationFlow = await DonationFlow.deploy(
    missionRegistry.address,
    beneficiaryRegistry.address,
    fiatBridge.address
  );
  await donationFlow.deployed();

  console.log("MissionRegistry deployed to:", missionRegistry.address);
  console.log("BeneficiaryRegistry deployed to:", beneficiaryRegistry.address);
  console.log("FiatBridge deployed to:", fiatBridge.address);
  console.log("DonationFlow deployed to:", donationFlow.address);
}
