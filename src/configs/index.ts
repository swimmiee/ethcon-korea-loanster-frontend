import { CHAINS, CHAIN_ID } from "./chains.config";
import { TOKENS } from "./tokens.config";

export const tokenList = TOKENS[CHAIN_ID];
export const chain = CHAINS.find(c => c.chainId === CHAIN_ID)!;
