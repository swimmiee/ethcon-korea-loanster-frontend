import { JsonRpcProvider } from "ethers";

interface MinChain {
  chainId: number;
  rpcUrls: string[];
}

export const getProvider = (chain: MinChain) => {
  return new JsonRpcProvider(chain.rpcUrls[0]);
};
