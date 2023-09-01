import { CHAINS } from "./chains.config";
import { TOKENS } from "./tokens.config";

export const getTokens = (chainId: number) => TOKENS[chainId];
export const getStableTokens = (chainId: number) =>
  TOKENS[chainId].filter((t) => t.type === "STABLE");
export const getChain = (chainId: number) =>
  CHAINS.find((c) => c.chainId === chainId)!;
