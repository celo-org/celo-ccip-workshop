const hre = require("hardhat");
const {
  abi,
} = require("../artifacts/contracts/SourceMinter.sol/SourceMinter.json");

const sourceMinterAddress = "";
const destinationChainSelector = "16015286601757825753";
const receiverDestinationMinterAddress = "";

async function main() {
  console.log(`Minting NFT from Alfajores to Sepolia...`);

  const [deployer] = await ethers.getSigners();
  const contract = new ethers.Contract(sourceMinterAddress, abi, deployer);

  // Call the transferOwnership function
  const tx = await contract.mint(
    destinationChainSelector,
    receiverDestinationMinterAddress,
    1
  );
  await tx.wait();
  console.log("tx", tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
