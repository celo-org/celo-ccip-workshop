const hre = require("hardhat");
const {
  abi,
} = require("../artifacts/contracts/SourceMinter.sol/SourceMinter.json");

const sourceMinterAddress = "0xF11f9085D5d8AFB2e5de62466F6e82F379E74509";
const destinationChainSelector = "16015286601757825753";
const receiverDestinationMinterAddress =
  "0x98413ff50d1e41C34a41bd7910b362A358610469";

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
