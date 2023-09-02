import { findTokens } from "configs";
import { InvestDto } from "interfaces/invest.dto";
import { useEffect, useState } from "react";
import { usePosition } from "states/position.state";
import { getInvestList } from "./getInvestList";

export const usePools = () => {
  const { invest, chain, long, setInvest } = usePosition();
  const [invests, setInvests] = useState<InvestDto[]>([]);
  useEffect(() => {
    getInvestList().then(setInvests);
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
          (i.chainId === long?.chainId && i.inputAssets.includes(long.address))
      )
      .sort((a, b) => b.tvlUSD * b.volumeUSD7D - a.tvlUSD * a.volumeUSD7D)
      .slice(0, 9),
  };
};
