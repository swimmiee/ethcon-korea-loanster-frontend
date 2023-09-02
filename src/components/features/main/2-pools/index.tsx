import { Selection } from "components/materials/Selection";
import { PoolItem } from "./PoolItem";
import { usePools } from "./pools.service";

export const Pools = () => {
  const { invests } = usePools();
  return (
    <div>
      <div className="grid grid-cols-3">
        {invests.map((invest, i) => (
          <PoolItem key={i} invest={invest} />
        ))}
      </div>
      {/* <Selection /> */}
      {/* <Selection
        selected={raw.chainId}
        setSelected={setChainId}
        items={CHAINS}
        getId={(c) => c.chainId}
        cols={2}
        Item={(chain) => (
          <div className="flex items-center gap-3">
            <ChainIcon size="xl" chain={chain} />
            <p className="text-t-xl">{chain.name}</p>
          </div>
        )}
      /> */}
    </div>
  );
};
