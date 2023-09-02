import { Selection } from "components/materials/Selection";
import { PoolItem } from "./PoolItem";
import { isHedgeable, usePools } from "./pools.service";
import { InvestDto } from "interfaces/invest.dto";
import { findTokens } from "configs";

export const Pools = () => {
  const { selectedInvest, invests, setInvest } = usePools();
  return (
    <Selection<InvestDto, string>
      selected={selectedInvest?.id || null}
      setSelected={(i) => setInvest(i)}
      items={invests}
      getId={(i) => i.id}
      cols={3}
      Item={PoolItem}
    />
  );
};
