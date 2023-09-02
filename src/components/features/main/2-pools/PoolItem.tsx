import { findTokens } from "configs";
import { InvestDto } from "interfaces/invest.dto";

interface PoolItemProps {
  invest: InvestDto;
}
export const PoolItem = ({
  invest: { chainId, inputAssets },
}: PoolItemProps) => {
  const tokens = findTokens(chainId, inputAssets, true);
  return (
    <div>
      <p className="text-t-xl">{tokens.map((t) => t.symbol).join("+")}</p>
    </div>
  );
};
