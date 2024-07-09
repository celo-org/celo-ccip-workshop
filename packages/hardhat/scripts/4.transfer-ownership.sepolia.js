const hre = require("hardhat");

const celoNFTAddress = "";
// DestinationMinter contract address
const newOwner = "";

async function main() {
  console.log(`Transfering Ownership of CeloNFT to Destination Minter...`);

  const [deployer] = await ethers.getSigners();
  const contractABI = ["function transferOwnership(address newOwner) public"];
  const contract = new ethers.Contract(celoNFTAddress, contractABI, deployer);

  // Call the transferOwnership function
  const tx = await contract.transferOwnership(newOwner);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
