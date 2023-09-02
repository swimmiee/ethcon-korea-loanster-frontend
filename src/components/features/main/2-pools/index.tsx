import { Selection } from "components/materials/Selection";
import { PoolItem } from "./PoolItem";
import { usePools } from "./pools.service";
import { InvestDto } from "interfaces/invest.dto";

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
