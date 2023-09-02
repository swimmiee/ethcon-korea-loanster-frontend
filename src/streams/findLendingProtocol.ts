import { LENDING_CONFIG } from "configs/lending.config";
import { Token } from "interfaces/token.interface";

export const findLendingProtocol = (long: Token, short: Token) => {
  const chainId = long.chainId;

  if(!LENDING_CONFIG[chainId]) return null;
  const protocol = LENDING_CONFIG[chainId].find(
    (config) =>
      config.borrowToken.includes(short.symbol) &&
      config.depositTokens.find((token) => token.symbol === long.symbol)
  );
  if (!protocol) return null;
  const deposit = protocol.depositTokens.find(
    (token) => token.symbol === long.symbol
  )!;

  return {
    name: protocol.protocol,
    core: protocol.core,
    depositToken: deposit,
    meta: protocol.meta,
  };
};
