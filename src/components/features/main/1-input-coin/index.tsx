import { TokenIcon } from "components/materials/coinIcons/TokenIcon";
import { getStableTokens } from "configs";
import { usePosition } from "states/position.state";
import { cn } from "utils";
import { encodeTokenId } from "utils/tokenIdEncoder";

export const InputStablecoin = () => {
  const chainId = 1;
  const stableTokens = getStableTokens(chainId);
  const { raw, setLong } = usePosition();
  return (
    <div>
      <div className="flex p-2 border bg-neutral-100 rounded-2xl">
        <div
          className={cn(
            raw.long === null && "bg-white border",
            "flex-1 rounded-l-xl flex items-center justify-center h-[54px]"
          )}
          onClick={() => setLong(null)}
        >
          <p className="text-t-lg">Any Token</p>
        </div>
        {stableTokens.map((token, i) => {
          const tokenId = encodeTokenId(token);
          return (
            <div
              key={i}
              onClick={() => setLong(tokenId)}
              className={cn(
                i === stableTokens.length - 1 && "rounded-r-xl",
                tokenId === raw.long && "bg-white border",
                "flex flex-1 p-2 justify-center items-center gap-3"
              )}
            >
              <TokenIcon size="xl" token={token} />
              <p className="text-h-sm">{token.symbol}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
