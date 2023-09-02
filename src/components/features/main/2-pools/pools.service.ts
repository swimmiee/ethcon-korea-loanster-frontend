import axios from "axios";
import { findTokens } from "configs";
import { InvestDto, InvestListDto } from "interfaces/invest.dto";
import { useEffect, useState } from "react";
import { usePosition } from "states/position.state";
const getInvests = async () =>
  axios
    .get<InvestListDto>(
      "https://api-stage-mainnet.toaster.finance/api/v1/invests",
      {
        params: {
          offset: 0,
          limit: 300,
        },
      }
    )
    .then((res) => res.data.invests);

export const usePools = () => {
  const { chain, long } = usePosition();
  const [invests, setInvests] = useState<InvestDto[]>([]);
  useEffect(() => {
    getInvests().then(setInvests);
  }, []);

  return {
    invests: invests
      .filter((i) => i.chainId === chain.chainId)
      .filter((i) => findTokens(i.chainId, i.inputAssets, false).every(Boolean))
      .filter(
        (i) =>
          long === null ||
          (i.chainId === long.chainId && i.inputAssets.includes(long.address))
      )
      .slice(0, 9),
  };
};
