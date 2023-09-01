import { cn, ellipsisAddr } from "utils";

interface AccountMainButtonProps {
  show: () => void;
  isConnected: boolean;
  address?: string;
}

export const AccountMainButton = ({
  show,
  isConnected,
  address,
}: AccountMainButtonProps) => {
  return (
    <button
      onClick={show}
      className={cn(
        "flex gap-2 items-center border-[1.5px] border-neutral-800 pl-4 pr-[18px] rounded-lg font-semibold",
        isConnected ? "bg-primary" : "bg-white hover:bg-neutral-100",
        )}
    >
      <p className="text-t-md">
        {isConnected ? ellipsisAddr(address!) : "Connect Wallet"}
      </p>
    </button>
  );
};
