import { DoubleTokensIcon } from "components/materials/coinIcons/DoubleTokensIcon";
import { findTokens } from "configs";
import { InvestDto } from "interfaces/invest.dto";
import { compactFormat } from "utils/formatter";

export const PoolItem = ({
  chainId,
  inputAssets,
  apr,
  tvlUSD,
  volumeUSD7D,
  meta,
}: InvestDto) => {
  const tokens = findTokens(chainId, inputAssets, true);
  return (
    <div className="flex flex-col flex-1 px-2 py-1">
      <div className="flex items-center gap-4">
        <DoubleTokensIcon tokens={tokens} />
        <p className="text-t-xl">{tokens.map((t) => t.symbol).join("+")}</p>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <p className="flex-1 text-neutral-500 font-light text-t-lg">APR</p>
        <p className="flex-1 text-right text-t-lg">{apr.toFixed(2)}%</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="flex-1 text-neutral-500 font-light text-t-lg">TVL</p>
        <p className="flex-1 text-right text-t-lg">$ {compactFormat(tvlUSD)}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="flex-1 text-neutral-500 font-light text-t-lg">Volume (7D)</p>
        <p className="flex-1 text-right text-t-lg">$ {compactFormat(volumeUSD7D)}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="flex-1 text-neutral-500 font-light text-t-lg">Fee Tier</p>
        <p className="flex-1 text-right text-t-lg">{meta.feeTier / 1e4}%</p>
      </div>
    </div>
  );
};
