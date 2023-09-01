import { TokenIcon } from "components/materials/coinIcons/TokenIcon";
import { chain, tokenList } from "configs";
import { useTokenBalancesInChain } from "states/balances.state";

export const RecommendedDeposits = () => {
  const tokenBalances = useTokenBalancesInChain(chain.chainId);
  return (
    <div className="flex flex-col divide-y">
      <div className="text-t-md grid grid-cols-[1fr_1.5fr_2fr_32px] gap-2 pb-1">
        <p className="text-center">Asset</p>
        <p className="text-center">Your Balance</p>
        <p className="text-center">Best APR</p>
      </div>
      {tokenBalances &&
        tokenList.map((token, i) => (
          <div className="hover:bg-neutral-50 place-items-center py-3 grid grid-cols-[1fr_1.5fr_2fr_32px] gap-2">
            <div className="w-full flex gap-2 items-center">
              <TokenIcon size="xl" token={token} />
              <p className="text-t-lg">{token.symbol}</p>
            </div>
            <p className="text-t-md text-center">
              {tokenBalances.find((t) => t.address === token.address)?.amount ??
                0}
            </p>
            <p className="text-t-md text-center">
              {(Math.random() * 5).toFixed(2)}% in {i & 1 ? "AAVE V3" : "Sonne"}
            </p>
            <p className="text-t-md text-center">→</p>
          </div>
        ))}
    </div>
  );
};
