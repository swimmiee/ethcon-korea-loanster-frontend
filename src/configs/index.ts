import { ZeroAddress, getAddress } from "ethers";
import { CHAINS } from "./chains.config";
import { TOKENS } from "./tokens.config";
import { decodeTokenId } from "utils/tokenIdEncoder";

export const getTokens = (chainId: number) => TOKENS[chainId];
export const getStableTokens = (chainId: number) =>
  TOKENS[chainId]
    .filter((t) => t.type === "STABLE")
    .sort((a, b) => (b.symbol < a.symbol ? 1 : -1));
export const getChain = (chainId: number) =>
  CHAINS.find((c) => c.chainId === chainId)!;

export const addrEqual = (a: string, b: string) => getAddress(a) === getAddress(b);

export const findToken = (encodedTokenId: string) => {
  const { chainId, address } = decodeTokenId(encodedTokenId);
  return getTokens(chainId).find((token) => addrEqual(token.address, address));
};

export const findTokens = (
  chainId: number,
  tokenAddrs: string[],
  autoUnwrap: boolean
) => {
  const tokensInChain = getTokens(chainId);
  return tokenAddrs.map((address) => {
    const t = tokensInChain.find((token) => addrEqual(token.address, address))!;
    return autoUnwrap && t?.type === "wETH"
      ? tokensInChain.find((token) => addrEqual(token.address, ZeroAddress))!
      : t;
  });
};
