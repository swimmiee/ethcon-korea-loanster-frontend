import { Selection } from "components/materials/Selection";
import { ChainIcon } from "components/materials/coinIcons/ChainIcon";
import { CHAINS } from "configs/chains.config";
import { usePosition } from "states/position.state";

export const ChainSelector = () => {
  const { chain, setChainId } = usePosition();

  return (
    <Selection
      selected={chain.chainId}
      setSelected={(c) => setChainId(c.chainId)}
      items={CHAINS}
      getId={(c) => c.chainId}
      cols={2}
      Item={(chain) => (
        <div className="flex items-center gap-3">
          <ChainIcon size="xl" chain={chain} />
          <p className="text-t-xl">{chain.name}</p>
        </div>
      )}
    />
  );
};
