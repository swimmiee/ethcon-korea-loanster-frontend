import { Signer } from "ethers";
import { useState } from "react";
import { HEDGE, usePosition } from "states/position.state";
import { ERC20__factory } from "typechain";
import { useGetSigner } from "utils/useGetSigner";

interface Tx {
  title: string;
  description: string;
  tx: (signer: Signer) => Promise<void>;
}
export const useTx = () => {
  const { hedge, amount, realLong, chain, invest, short } = usePosition();
  const [step, setStep] = useState<number>(0);
  const getSigner = useGetSigner();
  const txs: Tx[] = [];

  if (hedge !== HEDGE.NO_HEDGE) {
    // 1. approve to lending pool
    const approveTo = "";
    txs.push({
      title: "Approve",
      description: "Approve for lending pool",
      async tx(signer: Signer) {
        await ERC20__factory.connect(realLong!.address, signer).approve(
          approveTo,
          amount
        );
      },
    });

    // 2. deposit stable coin
    txs.push({
      title: "Deposit",
      description: "Deposit to lending pool",
      async tx(signer: Signer) {},
    });

    // 3. borrow short token
    txs.push({
      title: "Borrow",
      description: "Borrow from lending pool",
      async tx(signer: Signer) {},
    });
  }

  // 4. approve long token to toaster contract
  txs.push({
    title: "Approve",
    description: "Approve for toaster contract",
    async tx(signer: Signer) {
      await ERC20__factory.connect(realLong!.address, signer).approve(
        invest!.meta.toaster,
        amount // TODO
      );
    },
  });

  // 5. approve short token to toaster contract
  if (hedge !== HEDGE.NO_HEDGE) {
    txs.push({
      title: "Approve",
      description: "Approve for toaster contract",
      async tx(signer: Signer) {
        await ERC20__factory.connect(short!.address, signer).approve(
          invest!.meta.toaster,
          amount // TODO
        );
      },
    });
  }
  // 6. toast
  txs.push({
    title: "Provide Liquidity",
    description: "Provide liquidity to the pool",
    async tx(signer: Signer) {},
  });

  const run = async () => {
    const current = txs[step];
    const signer = await getSigner(chain.chainId);
    if (signer) {
      await current.tx(signer);
    }
    setStep((prev) => prev + 1);
  };

  return {
    step,
    txs,
    run
  };
};
