import { HEDGE, RANGE, usePosition } from "states/position.state";
import { Selection } from "components/materials/Selection";
import { findLendingProtocol } from "streams/findLendingProtocol";
import { RangeGraph } from "./RangeGraph";
import { BORROW_RATE, DEPOSIT_RATES } from "streams/getLendAndBorrowInfo";
import { BaseCoinIcon } from "components/materials/coinIcons/BaseCoinIcon";
import { LENDING_PROTOCOL_LOGO } from "configs/lending.config";

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
  { id: HEDGE.NO_HEDGE, name: "0%" },
  { id: HEDGE.STANDARD, name: "20%" },
  { id: HEDGE.MILD, name: "40%" },
  { id: HEDGE.FULL, name: "100%" },
];

export const RangeSelection = () => {
  const { realLong, short, poolRange, hedge, invest, setPoolRange, setHedge } =
    usePosition();
  const lendingProtocol =
    realLong && short ? findLendingProtocol(realLong, short) : undefined;

  const lb = (lendingProtocol?.depositToken.ltv ?? 0) * BORROW_RATE;
  const derate =
    Number(DEPOSIT_RATES[lendingProtocol ? hedge : HEDGE.NO_HEDGE]) / 100;

  const mul = 1 - ((1 - lb) * derate) / (1 + lb);
  const expectedApr = (invest?.dynamicMeta?.aprList[poolRange] ?? 0) * mul;

  const strategy = realLong?.symbol === "ETH" ? "Leverage" : "Hedge";

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
      <p className="text-t-lg mt-4 mb-2">
        Select {strategy.toLowerCase()} rate
      </p>
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
            {lendingProtocol === null
              ? "Hedge unavailable"
              : "Select pool first"}
          </p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-evenly gap-2">
        <p className="text-h-sm text-center">
          Expected APR: {expectedApr.toFixed(2)}%
        </p>
        {lendingProtocol && (
          <div className="flex gap-2 items-center">
            <p className="text-h-sm text-center">
              {realLong?.symbol === "ETH" ? "Leverage" : "Hedge"} with&nbsp;
              {lendingProtocol.name} Protocol
            </p>
            <BaseCoinIcon
              size="xl"
              imgSrc={LENDING_PROTOCOL_LOGO[lendingProtocol.name]}
              alt={lendingProtocol.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};
