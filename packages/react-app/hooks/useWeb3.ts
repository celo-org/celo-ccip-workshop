"use client";
import { sourceMinter } from "@/lib/abi/SourceMinter";
import {
  getAlfajoresSourceMinterAddress,
  getSepoliaNftAddress,
  getTokenAddress,
  receiverdDestinationMinterAddress,
} from "@/lib/config";
import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  erc721Abi,
  formatEther,
  http,
} from "viem";
import { celoAlfajores, sepolia } from "viem/chains";

export const useWeb3 = () => {
  const [balances, setBalances] = useState({
    celo: "0",
    cusd: "0",
    link: "0",
  });

  const sepoliaPublicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const alfajoresPublicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
  });
  const [nftBalance, setNftBalance] = useState(BigInt(0));

  const getAlfajoresWalletClient = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      return createWalletClient({
        chain: celoAlfajores,
        transport: custom(window.ethereum!),
      });
    } else {
      return null;
    }
  };

  const getTokenBalance = async () => {
    const alfajoresWalletClient = getAlfajoresWalletClient();
    if (!alfajoresWalletClient) return null;

    const celoBalance = await alfajoresPublicClient.getBalance({
      address: (await alfajoresWalletClient.getAddresses())[0],
    });
    const cusdBalance = await alfajoresPublicClient.readContract({
      address: getTokenAddress("cusd"),
      abi: erc20Abi,
      args: [(await alfajoresWalletClient.getAddresses())[0]],
      functionName: "balanceOf",
    });
    const linkBalance = await alfajoresPublicClient.readContract({
      address: getTokenAddress("link"),
      abi: erc20Abi,
      args: [(await alfajoresWalletClient.getAddresses())[0]],
      functionName: "balanceOf",
    });
    setBalances({
      celo: parseFloat(formatEther(celoBalance)).toFixed(3),
      cusd: parseFloat(formatEther(cusdBalance)).toFixed(3),
      link: parseFloat(formatEther(linkBalance)).toFixed(3),
    });
  };

  const getNftFromSepolia = async () => {
    const alfajoresWalletClient = getAlfajoresWalletClient();
    if (!alfajoresWalletClient) return null;

    const nftBalances = await sepoliaPublicClient.readContract({
      address: getSepoliaNftAddress(),
      abi: erc721Abi,
      args: [(await alfajoresWalletClient.getAddresses())[0]],
      functionName: "balanceOf",
    });
    console.log("nftBalance", nftBalances);
    setNftBalance(nftBalances);
  };

  const mintNftOnSepolia = async () => {
    const alfajoresWalletClient = getAlfajoresWalletClient();
    if (!alfajoresWalletClient) return null;

    const destinationChainSelector = BigInt("16015286601757825753");
    const receiverDestinationMinterAddress =
      receiverdDestinationMinterAddress();
    const payFeesIn = 1; // LINK

    const tx = await alfajoresWalletClient.writeContract({
      address: getAlfajoresSourceMinterAddress(),
      abi: sourceMinter,
      functionName: "mint",
      args: [
        destinationChainSelector,
        receiverDestinationMinterAddress,
        payFeesIn,
      ],
      account: (await alfajoresWalletClient.getAddresses())[0],
    });
    console.log("tx", tx);
    return tx;
  };

  return {
    balances,
    nftBalance,
    getTokenBalance,
    getNftFromSepolia,
    mintNftOnSepolia,
  };
};
