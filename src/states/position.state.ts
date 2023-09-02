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
  MILD = 2,
  FULL = 3,
}
interface PositionState {
  chainId: number;
  poolRange: RANGE;
  hedge: HEDGE;
  long: string | null;
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
    invest: null,
  },
});

export const usePosition = () => {
  const [position, setPosition] = useRecoilState(positionAtom);
  function setter<T>(key: keyof PositionState, toNull: ("long" | "invest")[]) {
    return (value: T) => {
      setPosition((prev) => {
        const item: PositionState = { ...prev, [key]: value };
        toNull.forEach((k) => {
          Object.assign(item, { [k]: null })
        });
        return item;
      });
    };
  }

  const setChainId = setter<number>("chainId", ["long", "invest"]);
  const setLong = setter<string | null>("long", ["invest"]);
  const setInvest = setter<InvestDto>("invest", []);
  const setPoolRange = setter<RANGE>("poolRange", []);
  const setHedge = setter<HEDGE>("hedge", []);
  const setAmount = setter<string>("amount", []);

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
            encodeTokenId(t) !== (realLong ? encodeTokenId(realLong) : null)
        )!
      : null,
    longId: position.long,
    invest: position.invest,
    poolRange: position.poolRange,
    hedge: position.hedge,
    amount: position.amount,
    isValid: Boolean(
      position.invest && !isNaN(+position.amount) && +position.amount > 0
    ),
    investTokens,
    setLong,
    setChainId,
    setInvest,
    setPoolRange,
    setHedge,
    setAmount,
  };
};
