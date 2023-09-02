import { findToken, findTokens, getChain } from "configs";
import { InvestDto } from "interfaces/invest.dto";
import { atom, useRecoilState } from "recoil";
import { encodeTokenId } from "utils/tokenIdEncoder";

export enum RANGE {
  SPOT = 0,
  STANDARD = 1,
  WIDE = 2,
}
export enum HEDGE {
  NO_HEDGE = 0,
  STANDARD = 1,
  STRONG = 2,
}
interface PositionState {
  chainId: number;
  poolRange: RANGE;
  hedge: HEDGE;
  long: string | null;
  short: string | null;
  invest: InvestDto | null;
  amount: string;
}

export const positionAtom = atom<PositionState>({
  key: "atom/position",
  default: {
    chainId: 1,
    poolRange: RANGE.STANDARD,
    hedge: HEDGE.STANDARD,
    amount: "",
    long: null,
    short: null,
    invest: null,
  },
});

export const usePosition = () => {
  const [position, setPosition] = useRecoilState(positionAtom);
  function setter<T>(key: keyof PositionState) {
    return (value: T) => {
      setPosition((prev) => ({ ...prev, [key]: value }));
    };
  }

  const setChainId = setter<number>("chainId");
  const setLong = setter<string | null>("long");
  const setInvest = setter<InvestDto>("invest");
  const setPoolRange = setter<RANGE>("poolRange");
  const setHedge = setter<HEDGE>("hedge");

  const invest = position.invest;
  const investTokens = invest
    ? findTokens(invest.chainId, invest.inputAssets, true)
    : null;

  const realLong = position.long
    ? findToken(position.long)
    : investTokens
    ? investTokens.find((t) => t.type === "STABLE")!
    : null;

  return {
    chain: getChain(position.chainId),
    long: position.long ? findToken(position.long) : null,
    realLong,
    short: investTokens
      ? investTokens.find(
          (t) =>
            encodeTokenId(t) === (realLong ? encodeTokenId(realLong) : null)
        )!
      : null,
    longId: position.long,
    shortId: position.short,
    invest: position.invest,
    poolRange: position.poolRange,
    hedge: position.hedge,
    amount: position.amount,
    isValid: position.invest,
    investTokens,
    setLong,
    setChainId,
    setInvest,
    setPoolRange,
    setHedge,
  };
};
