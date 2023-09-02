import { HEDGE, RANGE, usePosition } from "states/position.state";
import { Selection } from "components/materials/Selection";
import { findLendingProtocol } from "streams/findLendingProtocol";
import { RangeGraph } from "./RangeGraph";

interface RItem<T extends RANGE | HEDGE> {
  id: T;
  name: string;
}
const pooledRangeItems: RItem<RANGE>[] = [
  { id: RANGE.SPOT, name: "Spot" },
  { id: RANGE.STANDARD, name: "Standard" },
  { id: RANGE.WIDE, name: "Wide" },
];
const hedgePowerItems: RItem<HEDGE>[] = [
  { id: HEDGE.NO_HEDGE, name: "No Hedge" },
  { id: HEDGE.STANDARD, name: "Standard" },
  { id: HEDGE.STRONG, name: "Strong" },
  { id: HEDGE.NEUTRAL, name: "Neutral" },
];

export const RangeSelection = () => {
  const { realLong, short, poolRange, hedge, invest, setPoolRange, setHedge } =
    usePosition();
  const lendingProtocol =
    realLong && short ? findLendingProtocol(realLong, short) : undefined;

  return (
    <div>
      <p className="text-t-lg mb-2">Select pooled range</p>
      <RangeGraph range={poolRange} />
      <Selection
        selected={poolRange}
        setSelected={(r) => setPoolRange(r.id)}
        items={pooledRangeItems}
        getId={(i) => i.id}
        cols={3}
        Item={(item) => (
          <div className="flex-1">
            <p className="text-h-sm text-center">{item.name}</p>
          </div>
        )}
      />
      <p className="text-t-lg mt-4 mb-2">Select hedging power</p>
      {lendingProtocol ? (
        <Selection
          selected={hedge}
          setSelected={(r) => setHedge(r.id)}
          items={hedgePowerItems}
          getId={(i) => i.id}
          cols={4}
          Item={(item) => (
            <div className="flex-1">
              <p className="text-h-sm text-center">{item.name}</p>
            </div>
          )}
        />
      ) : (
        <div className="flex border border-neutral-400 bg-neutral-100 h-[49px] items-center justify-center">
          <p className="text-t-xl text-neutral-500">
            {lendingProtocol === null ? "Hedge unavailable" : "Select pool first"}
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-center gap-2">
        <p className="text-h-sm text-center"> Expected APR: </p>
        <p className="text-h-sm text-center">
          {invest?.dynamicMeta?.aprList[poolRange].toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
