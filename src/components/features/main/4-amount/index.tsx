import { TokenIcon } from "components/materials/coinIcons/TokenIcon";
import { useTokenBalancesInChain } from "states/balances.state";
import { usePosition } from "states/position.state";
import { cn } from "utils";

export const Amount = () => {
  const { chain, long, investTokens } = usePosition();
  const balances = useTokenBalancesInChain(chain.chainId);
  if (!long || !balances || !investTokens) return;
  const balance = balances.find((b) => b.address === long.address);
  return (
    <div>
        <p className="text-t-xl mb-2">
            Your balance: {balance?.amount ?? 0} {long.symbol}
        </p>
      <div className="flex gap-4">
        <div className="flex-1">
          <input className="w-full outline-none border border-gray-300 rounded-md p-4 text-h-md" />
        </div>
        <div className={cn("flex p-2 justify-center items-center gap-3")}>
          <TokenIcon size="xl" token={long} />
          <p className="text-h-sm">{long.symbol}</p>
        </div>
      </div>
    </div>
  );
};
