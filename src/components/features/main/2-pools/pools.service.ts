import { findTokens } from "configs";
import { usePosition } from "states/position.state";
import { getAddress } from "ethers";
import { InvestDto } from "interfaces/invest.dto";
import INVEST_LIST from "configs/invests.data.json";
import { Token } from "interfaces/token.interface";
import { findLendingProtocol } from "streams/findLendingProtocol";

export const usePools = () => {
  const { invest, chain, long, setInvest } = usePosition();
  return {
    selectedInvest: invest,
    setInvest,
    invests: (INVEST_LIST as InvestDto[])
      .filter((i) => i.chainId === chain.chainId)
      .filter((i) => {
        const ingredients = findTokens(i.chainId, i.inputAssets, true);
        return (
          ingredients.every(Boolean) &&
          (!long || ingredients.map((i) => i.symbol).includes(long.symbol))
        );
      })
      .sort((a, b) => b.tvlUSD * b.volumeUSD7D - a.tvlUSD * a.volumeUSD7D)
      .sort(
        (a, b) =>
          Number(isHedgeable(findTokens(b.chainId, b.inputAssets, true))) -
          Number(isHedgeable(findTokens(a.chainId, a.inputAssets, true)))
      )
      .slice(0, 9),
  };
};

export const isHedgeable = (tokens: Token[]) => {
  return Boolean(
    findLendingProtocol(tokens[0], tokens[1]) ??
      findLendingProtocol(tokens[1], tokens[0])
  );
};
