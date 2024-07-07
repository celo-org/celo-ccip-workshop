"use client";
import { sourceMinter } from "@/lib/abi/SourceMinter";
import {
  getAlfajoresSourceMinterAddress,
  getSepoliaNftAddress,
  getTokenAddress,
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
      args: ["0xF11f9085D5d8AFB2e5de62466F6e82F379E74509"],
      // args: [(await alfajoresWalletClient.getAddresses())[0]],
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

    const nftBalance = await sepoliaPublicClient.readContract({
      address: getSepoliaNftAddress(),
      abi: erc721Abi,
      args: ["0x98f7e3fc142ce7736956cd79d3f6b164c631a3d9"],
      // args: [(await alfajoresWalletClient.getAddresses())[0]],
      functionName: "balanceOf",
    });
    console.log("🚀 ~ getNftFromSepolia ~ nftBalance:", nftBalance);
  };

  const mintNftOnSepolia = async () => {
    const alfajoresWalletClient = getAlfajoresWalletClient();
    if (!alfajoresWalletClient) return null;

    const destinationChainSelector = BigInt("16015286601757825753");
    console.log("destinationChainSelector", destinationChainSelector);
    const receiverDestinationMinterAddress =
      "0x98413ff50d1e41C34a41bd7910b362A358610469";
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

  return { balances, getTokenBalance, getNftFromSepolia, mintNftOnSepolia };
};
