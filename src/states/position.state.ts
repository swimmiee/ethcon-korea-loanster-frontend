import { getChain } from "configs";
import { InvestDto } from "interfaces/invest.dto";
import { atom, useRecoilState } from "recoil";
import { decodeTokenId } from "utils/tokenIdEncoder";

interface PositionState {
  chainId: number;
  long: string | null;
  short: string | null;
  invest: InvestDto | null;
}

export const positionAtom = atom<PositionState>({
  key: "atom/position",
  default: {
    chainId: 1,
    long: null,
    short: null,
    invest: null,
  },
});

export const usePosition = () => {
  const [position, setPosition] = useRecoilState(positionAtom);
  const setChainId = (chainId: number) => {
    setPosition((prev) => ({ ...prev, chainId }));
  };
  const setLong = (long: string | null) => {
    setPosition((prev) => ({ ...prev, long }));
  };
  const setShort = (short: string | null) => {
    setPosition((prev) => ({ ...prev, short }));
  };

  return {
    chain: getChain(position.chainId),
    long: position.long ? decodeTokenId(position.long) : null,
    short: position.short ? decodeTokenId(position.short) : null,
    longId: position.long,
    shortId: position.short,
    invest: position.invest,
    setLong,
    setShort,
    setChainId,
  };
};
