const hre = require("hardhat");

const routerAddress = "0xb00E95b773528E2Ea724DB06B75113F239D15Dca";
const linkTokenAddress = "0x32E08557B14FaD8908025619797221281D439071";

async function main() {
  console.log(`Deploying Source Minter...`);
  const SourceMinter = await hre.ethers.getContractFactory("SourceMinter");
  const sourceMinter = await SourceMinter.deploy(
    routerAddress,
    linkTokenAddress
  );

  await sourceMinter.deployed();

  console.log(`Source Minter deployed to :: ${sourceMinter.address}`);
  // verify hardhat
  try {
    await hre.run("verify:verify", {
      address: sourceMinter.address,
      constructorArguments: [routerAddress, linkTokenAddress],
    });
  } catch (e) {
    console.log("Cannot verify the contract");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
