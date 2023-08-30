import { ellipsisAddr } from "utils";

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
  const fill = `hsl(${104 + Number(address?.slice(0, 4) || 0)}, 100%, 80%)`;
  return (
    <button
      onClick={show}
      className="flex gap-2 items-center border-[1.5px] border-neutral-800 bg-primary pl-4 pr-[18px] rounded-lg font-semibold"
    >
      {isConnected && (
        <svg
          className="mr-0.5 w-5 h-5"
          style={{ fill, stroke: "#000", strokeWidth: 60 }}
          width={20}
          height={20}
          viewBox="0 0 775.96 767.89"
        >
          <path d="m678.6,702.51l.2-356.31c84.74-43.55,50.18-156.63,50.18-156.63C677.67,33.32,406.97,39.58,388.09,40.21c-18.88-.65-289.56-7.22-341.06,148.98,0,0-34.69,113.04,50,156.68l-.2,356.31c0,14.02,11.36,25.4,25.38,25.41l530.98.3c14.02,0,25.4-11.36,25.41-25.38Z" />
        </svg>
      )}
      <p className="text-t-md">
        {isConnected ? ellipsisAddr(address!) : "Connect Wallet"}
      </p>
    </button>
  );
};
