const hre = require("hardhat");

async function main() {
  console.log(`Deploying Celo NFT...`);

  const CeloNFT = await hre.ethers.getContractFactory("CeloNFT");
  const celoNFT = await CeloNFT.deploy();

  await celoNFT.deployed();

  console.log(`CeloNFT deployed to :: ${celoNFT.address}`);

  // verify hardhat
  try {
    await hre.run("verify:verify", {
      address: celoNFT.address,
    });
  } catch (e) {
    console.log("Cannot verify the contract");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
