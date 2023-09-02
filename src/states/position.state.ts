import { getChain } from "configs";
import { InvestDto } from "interfaces/invest.dto";
import { atom, useRecoilState } from "recoil";
import { decodeTokenId } from "utils/tokenIdEncoder";

export enum RANGE {
  SPOT = 0,
  STANDARD = 1,
  WIDE = 2,
}
interface PositionState {
  chainId: number;
  poolRange: RANGE;
  hedge: RANGE;
  long: string | null;
  short: string | null;
  invest: InvestDto | null;
}

export const positionAtom = atom<PositionState>({
  key: "atom/position",
  default: {
    chainId: 1,
    poolRange: RANGE.STANDARD,
    hedge: RANGE.STANDARD,
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
  const setShort = setter<string | null>("short");
  const setInvest = setter<InvestDto>("invest");
  const setPoolRange = setter<RANGE>("poolRange");
  const setHedge = setter<RANGE>("hedge");

  return {
    chain: getChain(position.chainId),
    long: position.long ? decodeTokenId(position.long) : null,
    short: position.short ? decodeTokenId(position.short) : null,
    longId: position.long,
    shortId: position.short,
    invest: position.invest,
    poolRange: position.poolRange,
    hedge: position.hedge,
    setLong,
    setShort,
    setChainId,
    setInvest,
    setPoolRange,
    setHedge,
  };
};
