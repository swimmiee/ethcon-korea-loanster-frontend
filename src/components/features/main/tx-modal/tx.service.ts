import { HEDGE, RANGE, usePosition } from "states/position.state";
import { ERC20__factory } from "typechain";
import { useGetSigner } from "utils/useGetSigner";
import { useAccount } from "wagmi";

export const useTx = () => {
  const { hedge } = usePosition();
  const {} = useGetSigner()
  const txs = [];

  // 1. approve to lending pool
  if (hedge !== HEDGE.NO_HEDGE) {
    txs.push({
      title: "Approve",
      description: "Approve to lending pool",
      status: "pending",
    //   tx: ERC20__factory.connect(hedge, signer).approve(lendingPool, amount),
    });
  }
};
