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
  const { invest, chain, long, setInvest } = usePosition();
  const [invests, setInvests] = useState<InvestDto[]>([]);
  useEffect(() => {
    getInvests().then(setInvests);
  }, []);

  return {
    selectedInvest: invest,
    setInvest,
    invests: invests
      .filter((i) => i.project === "Uniswap V3")
      .filter((i) => i.chainId === chain.chainId)
      .filter((i) => {
        const ingredients = findTokens(i.chainId, i.inputAssets, false);
        return (
          ingredients.every(Boolean) &&
          ingredients.some((i) => i.type === "STABLE")
        );
      })
      .filter(
        (i) =>
          long === null ||
          (i.chainId === long.chainId && i.inputAssets.includes(long.address))
      )
      .sort((a, b) => b.tvlUSD * b.volumeUSD7D - a.tvlUSD * a.volumeUSD7D)
      .slice(0, 9),
  };
};
