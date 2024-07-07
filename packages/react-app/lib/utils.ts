import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { celo, celoAlfajores } from "viem/chains";
import { createConfig, http } from "wagmi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "Celo Composer",
    projectId: "044601f65212332475a09bc14ceb3c34",
  }
);

export const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});
