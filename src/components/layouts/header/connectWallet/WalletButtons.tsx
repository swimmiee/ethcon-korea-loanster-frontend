import {
  CustomButtonProps,
  useConnectWallet,
} from "utils/hooks/useConnectWallet";
import { AccountMainButton } from "./AccountButton";

export const WalletButtons = (props: CustomButtonProps) => {
  const { onClick, isConnected, address } = useConnectWallet(props);

  return (
    <div className="relative flex gap-3 h-[42px]">
      <AccountMainButton
        isConnected={isConnected}
        address={address}
        show={onClick}
      />
    </div>
  );
};
