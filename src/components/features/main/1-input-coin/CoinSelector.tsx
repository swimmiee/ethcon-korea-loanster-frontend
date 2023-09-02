import { Selection } from "components/materials/Selection";
import { TokenIcon } from "components/materials/coinIcons/TokenIcon";
import { getStableTokens } from "configs";
import { usePosition } from "states/position.state";
import { encodeTokenId } from "utils/tokenIdEncoder";

export const CoinSelector = () => {
  const { chain, longId, setLong } = usePosition();
  const stableTokens = getStableTokens(chain.chainId);
  return (
    <Selection
      selected={longId}
      setSelected={({ token }) => setLong(token ? encodeTokenId(token) : null)}
      items={[{ token: null }, ...stableTokens.map((token) => ({ token }))]}
      getId={({ token }) => (token ? encodeTokenId(token) : null)}
      Item={(item) =>
        item.token ? (
          <div className="flex flex-1 items-center justify-center gap-3 pr-2">
            <TokenIcon size="xl" token={item.token} />
            <p className="text-h-sm">{item.token.symbol}</p>
          </div>
        ) : (
          <p className="flex-1 text-h-sm text-center">Any Token</p>
        )
      }
      cols={4}
    />
  );
};
