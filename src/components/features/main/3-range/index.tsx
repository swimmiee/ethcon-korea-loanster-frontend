import { RANGE, usePosition } from "states/position.state";
import { Selection } from "components/materials/Selection";

interface RangeItem {
  id: RANGE;
  name: string;
}
const pooledRangeItems: RangeItem[] = [
  { id: RANGE.SPOT, name: "Spot" },
  { id: RANGE.STANDARD, name: "Standard" },
  { id: RANGE.WIDE, name: "Wide" },
];
const hedgePowerItems: RangeItem[] = [
  { id: RANGE.SPOT, name: "No Hedge" },
  { id: RANGE.STANDARD, name: "Standard" },
  { id: RANGE.WIDE, name: "Strong" },
];

export const RangeSelection = () => {
  const { poolRange, hedge, invest, setPoolRange, setHedge } = usePosition();

  return (
    <div>
      <p className="text-t-lg mb-2">Select pooled range</p>
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
      <Selection
        selected={hedge}
        setSelected={(r) => setHedge(r.id)}
        items={hedgePowerItems}
        getId={(i) => i.id}
        cols={3}
        Item={(item) => (
          <div className="flex-1">
            <p className="text-h-sm text-center">{item.name}</p>
          </div>
        )}
      />

      <div className="mt-6 flex justify-center gap-2">
        <p className="text-h-sm text-center"> Expected APR: </p>
        <p className="text-h-sm text-center">
          {invest?.dynamicMeta?.aprList[poolRange].toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
