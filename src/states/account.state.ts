import { useEffect } from "react";
import { atom, useSetRecoilState } from "recoil";
import { useAccount } from "wagmi";

export const accountAtom = atom<string | null>({
  key: "atom/account",
  default: null,
});

export const useSyncAccount = () => {
  const wagmiAccount = useAccount();
  const setAccount = useSetRecoilState(accountAtom);
  useEffect(() => {
    setAccount(wagmiAccount.address ?? null);
  }, [wagmiAccount.address]);
};
