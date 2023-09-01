import axios from "axios";
import { InvestDto, InvestListDto } from "interfaces/invest.dto";
import { useEffect, useState } from "react";
import { usePosition } from "states/position.state";
const getInvests = async () =>
  axios
    .get<InvestListDto>(
      "https://api-stage-mainnet.toaster.finance/v1/invests",
      {
        params: {
          offset: 0,
          limit: 300,
        },
      }
    )
    .then((res) => res.data.invests);

export const usePools = () => {
  const { long } = usePosition();
  const [invests, setInvests] = useState<InvestDto[]>([]);
  useEffect(() => {
    getInvests().then(setInvests);
  }, []);

  return {
    invests: invests.filter(
      (i) =>
        long === null ||
        (i.chainId === long.chainId && i.inputAssets.includes(long.address))
    ),
  };
};
