// @ts-ignore
import { ConnectKitButton } from "connectkit";
import { WalletButtons } from "./WalletButtons";

export const ConnectWalletButton = () => (
  <ConnectKitButton.Custom children={WalletButtons} />
);
