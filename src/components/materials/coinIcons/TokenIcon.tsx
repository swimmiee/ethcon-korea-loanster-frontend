import { BaseCoinIcon, CoinIconSize } from "./BaseCoinIcon";

interface TokenIconProps {
  size: CoinIconSize;
  mobileSize?: CoinIconSize;
  withChain?: boolean;
  token: {
    logoURI: string;
    symbol?: string;
    chainId: number;
  };
  className?: string;
}
export const TokenIcon = ({
  size,
  mobileSize,
  token,
  className,
}: TokenIconProps) => {
  return (
    <div className="relative">
      <BaseCoinIcon
        size={size}
        mobileSize={mobileSize}
        imgSrc={token.logoURI}
        alt={token.symbol || "token"}
        className={className}
      />
    </div>
  );
};
