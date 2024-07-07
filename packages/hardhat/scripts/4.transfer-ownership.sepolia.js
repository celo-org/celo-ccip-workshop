const hre = require("hardhat");

const celoNFTAddress = "0x5F7d03E873c2E2F544540A03c46dD34bC4A47436";
// DestinationMinter contract address
const newOwner = "0x98413ff50d1e41C34a41bd7910b362A358610469";

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
