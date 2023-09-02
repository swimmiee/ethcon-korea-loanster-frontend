import { formatUnits } from "ethers";
import { Token } from "interfaces/token.interface";

export const toBalanceState = (
  states: ([Token, bigint, string] | [Token, bigint])[]
) => {
  return states.map(([token, amount, alias]) => ({
    name: alias ?? token.symbol,
    amount: formatUnits(amount, token.decimals),
    dollarValue: +(+formatUnits(amount, token.decimals) * token.priceUSD).toFixed(2),
  }));
};

