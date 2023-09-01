import { TokenIcon } from "components/materials/coinIcons/TokenIcon";
import { getStableTokens } from "configs";
import { usePosition } from "states/position.state";

export const SelectInputCoin = () => {
  const chainId = 1;
  const stableTokens = getStableTokens(chainId);
  console.log(stableTokens);
  const {} = usePosition();
  return (
    <div>
      {stableTokens.map((token, i) => (
        <div key={i} className="flex items-center gap-3">
          <TokenIcon size="xxl" token={token} />
          <p className="text-h-sm">{token.symbol}</p>
        </div>
      ))}
    </div>
  );
};
