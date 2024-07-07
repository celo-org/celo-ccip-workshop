const hre = require("hardhat");

const routerAddress = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";
const celoNFTAddress = "0x5F7d03E873c2E2F544540A03c46dD34bC4A47436";

async function main() {
  console.log(`Deploying Destination Minter...`);
  const DestinationMinter = await hre.ethers.getContractFactory(
    "DestinationMinter"
  );
  const destinationMinter = await DestinationMinter.deploy(
    routerAddress,
    celoNFTAddress
  );

  await destinationMinter.deployed();

  console.log(`Destination Minter deployed to :: ${destinationMinter.address}`);

  // verify hardhat
  try {
    await hre.run("verify:verify", {
      address: destinationMinter.address,
      constructorArguments: [routerAddress, celoNFTAddress],
    });
  } catch (e) {
    console.log("Cannot verify the contract");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
