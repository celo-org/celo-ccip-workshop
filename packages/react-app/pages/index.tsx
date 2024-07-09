import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWeb3 } from "@/hooks/useWeb3";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [minting, setMinting] = useState(false);
  const [isTestnet, setIsTestnet] = useState(false);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const {
    balances,
    nftBalance,
    getTokenBalance,
    getNftFromSepolia,
    mintNftOnSepolia,
  } = useWeb3();

  const [ccipTxHash, setCcipTxHash] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (chainId === 44787) {
      setIsTestnet(true);
    } else {
      setIsTestnet(false);
    }
  }, [chainId]);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  useEffect(() => {
    getTokenBalance();
    getNftFromSepolia();
  }, []);

  if (!isTestnet) {
    return (
      <div>
        <h1>Wrong Network</h1>
        <p>Please connect to Alfajores testnet</p>
      </div>
    );
  }

  if (!isMounted) {
    return null;
  }

  const mintNFT = async () => {
    try {
      setMinting(true);
      const txHash = await mintNftOnSepolia();
      setCcipTxHash(txHash);
    } catch (e) {
      console.error(e);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {isConnected ? (
        <>
          <Card className="w-full border-black border">
            <CardHeader>
              <CardTitle>Balances</CardTitle>
              <CardDescription>{userAddress}</CardDescription>
            </CardHeader>
            <CardContent className="text-lg">
              <p>
                Celo: <b>{balances.celo} CELO</b>
              </p>
              <p>
                cUSD: <b>{balances.cusd} cUSD</b>
              </p>
              <p>
                Link: <b>{balances.link} LINK</b>
              </p>
            </CardContent>
          </Card>
          <main className="my-4 flex items-center flex-col space-y-4">
            {/* Check for previous NFTs */}
            <div>
              <Button disabled={minting} onClick={mintNFT}>
                {minting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  "Mint NFT on Sepolia"
                )}
              </Button>
            </div>
            {ccipTxHash && (
              <div>
                <a
                  href={`https://alfajores.celoscan.io/${ccipTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View on CeloScan
                </a>
              </div>
            )}
            {nftBalance === BigInt(0) ? (
              <p className="text-gray-500">No NFTs found in your account.</p>
            ) : (
              <div className="mt-10 font-bold w-full flex items-center justify-center flex-col">
                <h2 className="text-2xl">NFT Count</h2>
                <h1 className="text-4xl">{nftBalance.toString()}</h1>
              </div>
            )}

            {/* <div className="grid grid-cols-2 gap-4">
              <Skeleton className="w-[150px] h-[175px] rounded-xl" />
              <Skeleton className="w-[150px] h-[175px] rounded-xl" />
            </div> */}
          </main>
        </>
      ) : (
        <div>No Wallet Connected</div>
      )}
    </div>
  );
}
