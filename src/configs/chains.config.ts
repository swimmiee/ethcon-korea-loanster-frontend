import { Chain } from "interfaces/chain.interface";

const SUPPORTED_CHAINS = [1, 10, 137, 42161, 59144, 1101];

export const CHAINS: Chain[] = [
  {
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg",
    name: "Ethereum",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    explorer: "https://etherscan.io/",
  },
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
  {
    chainId: 56,
    logoURI:
      "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/bsc.svg",
    name: "BSC",
    symbol: "BNB",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: [
      "https://bsc-dataseed.binance.org/",
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
    ],
    explorer: "https://bscscan.com/",
  },
  {
    chainId: 137,
    logoURI:
      "https://research.binance.com/static/images/projects/matic-network/logo.png",
    name: "Polygon",
    symbol: "MATIC",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: [
      "https://polygon-rpc.com/",
      "https://rpc-mainnet.maticvigil.com/",
    ],
    explorer: "https://polygonscan.com/",
  },
  {
    chainId: 42161,
    logoURI:
      "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg",
    name: "Arbitrum",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    explorer: "https://arbiscan.io/",
  },
  {
    chainId: 59144,
    logoURI: "https://assets.debank.com/static/media/linea.2cdc0d38.svg",
    name: "Linea",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    explorer: "https://arbiscan.io/",
  },
  {
    chainId: 1101,
    logoURI:
      "https://assets.debank.com/static/media/polygon-zkevm.967a0a73.svg",
    name: "Polygon zkEVM",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    explorer: "https://arbiscan.io/",
  },
].filter((c) => SUPPORTED_CHAINS.includes(c.chainId));
