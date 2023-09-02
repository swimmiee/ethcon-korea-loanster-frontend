import { findTokens } from "configs";
import { usePosition } from "states/position.state";
import { getAddress } from "ethers";
import { InvestDto } from "interfaces/invest.dto";
import INVEST_LIST from "configs/invests.data.json";

export const usePools = () => {
  const { invest, chain, long, setInvest } = usePosition();
  return {
    selectedInvest: invest,
    setInvest,
    invests: (INVEST_LIST as InvestDto[])
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
          (i.chainId === long?.chainId &&
            i.inputAssets.map(getAddress).includes(getAddress(long.address)))
      )
      .sort((a, b) => b.tvlUSD * b.volumeUSD7D - a.tvlUSD * a.volumeUSD7D)
      .slice(0, 9),
  };
};
