import { Chain } from "interfaces/chain.interface";

export const CHAINS:Chain[] = [
  {
    chainId: 10,
    logoURI:
      "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/optimism.svg",
    name: "Optimism",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://mainnet.optimism.io/"],
    explorer: "https://optimistic.etherscan.io/",
  },
];
