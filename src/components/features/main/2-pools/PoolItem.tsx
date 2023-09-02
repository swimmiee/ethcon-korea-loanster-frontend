import { DoubleTokensIcon } from "components/materials/coinIcons/DoubleTokensIcon";
import { findTokens } from "configs";
import { InvestDto } from "interfaces/invest.dto";
import { findLendingProtocol } from "streams/findLendingProtocol";
import { compactFormat } from "utils/formatter";
import { isHedgeable } from "./pools.service";

export const PoolItem = ({
  chainId,
  inputAssets,
  apr,
  tvlUSD,
  volumeUSD7D,
  meta,
}: InvestDto) => {
  const tokens = findTokens(chainId, inputAssets, true);
  const hedgeable = isHedgeable(tokens);
  return (
    <div className="flex flex-col flex-1 px-2 py-1">
      <div className="flex items-center gap-2 -mx-1 justify-between">
        <DoubleTokensIcon tokens={tokens} />
        <p className="text-t-xl">{tokens.map((t) => t.symbol).join("+")}</p>
        {hedgeable ? (
          <div className="bg-primary-100 w-10 py-0.5 rounded">
            <p className="text-l-sm text-center">Hedge</p>
          </div>
        ) : (
          <div className="w-10" />
        )}
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
        <p className="flex-1 text-neutral-500 font-light text-t-lg">
          Volume (7D)
        </p>
        <p className="flex-1 text-right text-t-lg">
          $ {compactFormat(volumeUSD7D)}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="flex-1 text-neutral-500 font-light text-t-lg">Fee Tier</p>
        <p className="flex-1 text-right text-t-lg">{meta.feeTier / 1e4}%</p>
      </div>
    </div>
  );
};
