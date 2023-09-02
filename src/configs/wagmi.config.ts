import { configureChains, createConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// @ts-ignore
import { getDefaultConfig } from "connectkit";
import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";

const SUPPORTED_CHAINS = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
];
const { chains } = configureChains(SUPPORTED_CHAINS, [
  alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
  publicProvider(),
]);
const wagmiConfig = createConfig(
  getDefaultConfig({
    chains,
    // Required API Keys
    // alchemyId: process.env.ALCHEMY_ID,
    alchemyId: import.meta.env.VITE_ALCHEMY_ID,
    walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,

    // Required
    appName: "Toaster Finance",

    // Optional
    appDescription: "Toaster Finance is a DeFi onboarding app for everyone.",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

export default wagmiConfig;
