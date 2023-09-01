import {
  atom,
  selector,
  selectorFamily,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { formatUnits } from "ethers";
import { accountAtom } from "./account.state";
import { getTokenBalances } from "streams/getTokenBalances";
import { decodeTokenId, encodeTokenId } from "utils/tokenIdEncoder";
import { Token } from "interfaces/token.interface";
import { CHAINS } from "configs/chains.config";
import { TOKENS } from "configs/tokens.config";

const fetchBalancesIndex = atom<number>({
  key: "atom/fetch-balances",
  default: 1,
});

interface BalanceByTokenId {
  [tokenId: string]: string;
}

export const fetchBalancesQuery = selector<BalanceByTokenId>({
  key: "selector/fetch-balances",
  get: async ({ get }) => {
    get(fetchBalancesIndex);
    const account = get(accountAtom);
    if (!account) return {};

    const chains = CHAINS;
    const tokens = TOKENS;

    const balancesByChain = await Promise.allSettled(
      chains.map(async (chain) => {
        tokens[chain.chainId] = tokens[chain.chainId] ?? [];

        const balances = await getTokenBalances(
          account,
          chain,
          tokens[chain.chainId].map((t) => t.address)
        );

        return tokens[chain.chainId].reduce((acc, token, index) => {
          const bal = formatUnits(balances[index], token.decimals);
          if (+bal > 0) acc[encodeTokenId(token)] = bal;
          return acc;
        }, {} as BalanceByTokenId);
      })
    );

    return balancesByChain.reduce((acc, balancesResult) => {
      if (balancesResult.status === "fulfilled")
        Object.assign(acc, balancesResult.value);
      return acc;
    }, {} as BalanceByTokenId);
  },
});

// get balance by token id given chain(currentChain)
// token id :: `${this.chainId}_${this.address}`;
export const balancesState = selectorFamily<string | null, string | null>({
  key: "selector/balances",
  get:
    (tokenId) =>
    ({ get }) => {
      return tokenId ? get(fetchBalancesQuery)[tokenId] ?? null : null;
    },
});

/** token에 대한 Balance를 가져올 때 사용
 * @param token 토큰 종류
 * @param defaultText optional, balance를 가져오지 못했거나, Owner 주소가 없을 때 띄울 텍스트. default = ""
 *
 * 아래와 같이 사용하여 tokenA에 대한 currentUser의 balance를 얻을 수 있다.
 * const userTokenBalance = useBalance(tokenA);
 *
 */
export const useBalance = (token: Token | null): string => {
  if (!token) return "";
  const tokenId = encodeTokenId(token);
  const balanceState = useRecoilValueLoadable(balancesState(tokenId ?? null));
  return token && balanceState.state === "hasValue" && balanceState.contents
    ? balanceState.contents
    : "";
};

export const useTokenBalancesInChain = (chainId: number) => {
  const allBalances = useRecoilValueLoadable(fetchBalancesQuery);
  if (allBalances.state === "hasValue") {
    const balancesMap = Object.entries(allBalances.contents).reduce(
      (acc, [tokenId, amount]) => {
        const decoded = decodeTokenId(tokenId);
        if (decoded.chainId === chainId) {
          acc.push({ address: decoded.address, amount });
        }
        return acc;
      },
      [] as { address: string; amount: string }[]
    );
    return balancesMap;
  } else {
    return null;
  }
};

export const useRefreshBalance = () => {
  const setIndex = useSetRecoilState(fetchBalancesIndex);
  return () => setIndex((prev) => prev + 1);
};
