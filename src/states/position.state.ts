import { atom, useRecoilState, useRecoilValue } from "recoil";
import { decodeTokenId } from "utils/tokenIdEncoder";

interface PositionState {
  long: string | null;
  short: string | null;
}

export const positionAtom = atom<PositionState>({
  key: "atom/position",
  default: {
    long: null,
    short: null,
  },
});

export const usePosition = () => {
  const [position, setPosition] = useRecoilState(positionAtom);
  const setLong = (long: string | null) => {
    setPosition((prev) => ({ ...prev, long }));
  };
  const setShort = (short: string | null) => {
    setPosition((prev) => ({ ...prev, short }));
  };

  return {
    long: position.long ? decodeTokenId(position.long) : null,
    short: position.short ? decodeTokenId(position.short) : null,
    raw: position,
    setLong,
    setShort,
  };
};
