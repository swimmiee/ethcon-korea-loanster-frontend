import { Signer, formatUnits } from "ethers";
import { useState } from "react";
import { HEDGE, usePosition } from "states/position.state";
import { getLendAndBorrowAmount } from "streams/getBorrowAmount";
import { ERC20__factory } from "typechain";
import { toFixedCond } from "utils/formatter";
import { useGetSigner } from "utils/useGetSigner";

export interface BalanceState {
  name: string; // USDC, Deposited USDC, ...
  amount: string;
  dollarValue: number;
}
interface Tx {
  title: string;
  description: string;
  balanceWillbe: BalanceState[];
  tx: (signer: Signer) => Promise<void>;
}
export interface Task {
  title: string;
  description: string;
}
export const useTx = () => {
  const { hedge, amount, realLong, chain, invest, short } = usePosition();
  const [step, setStep] = useState<number>(0);
  const getSigner = useGetSigner();
  const txs: Tx[] = [];
  const tasks: Task[] = []; // just for display

  const {
    lendAmount,
    longInputAmount,
    borrowAmount,
    lendingPool,
    lendingProtocol,
  } = getLendAndBorrowAmount(realLong!, short!, amount, hedge);

  const longInputAmountFormatted = toFixedCond(
    formatUnits(longInputAmount, realLong?.decimals)
  );
  const lendAmountFormatted = toFixedCond(
    formatUnits(lendAmount, realLong?.decimals)
  );
  const borrowAmountFormatted = toFixedCond(
    formatUnits(borrowAmount, short?.decimals)
  );

  // const initBalances = [
  //   {
  //     name: realLong!.symbol,
  //     amount,
  //     dollarValue:
  //       +formatUnits(amount, realLong!.decimals) * realLong!.priceUSD,
  //   },
  // ];
  const initBalances = [
    {
      name: realLong!.symbol,
      amount: longInputAmountFormatted,
      dollarValue: +longInputAmountFormatted * realLong!.priceUSD,
    },
    {
      name: `Deposited ${realLong!.symbol}`,
      amount: lendAmountFormatted,
      dollarValue: +lendAmountFormatted * realLong!.priceUSD,
    },
  ];

  if (hedge !== HEDGE.NO_HEDGE) {
    tasks.push({
      title: `Hedge with ${lendingProtocol}`,
      description: `Deposit ${lendAmountFormatted} ${realLong?.symbol} → Lend ${borrowAmountFormatted} ${short?.symbol}`,
    });

    // 1. approve to lending pool
    txs.push({
      title: "Approve",
      description: `Approve ${lendAmountFormatted} ${
        realLong!.symbol
      } for lending pool`,
      balanceWillbe: initBalances,
      async tx(signer: Signer) {
        await ERC20__factory.connect(realLong!.address, signer).approve(
          lendingPool,
          lendAmount
        );
      },
    });

    // 2. deposit stable coin
    txs.push({
      title: "Deposit",
      description: "Deposit to lending pool",
      balanceWillbe: [
        {
          name: realLong!.symbol,
          amount: longInputAmountFormatted,
          dollarValue: +longInputAmountFormatted * realLong!.priceUSD,
        },
        {
          name: `Deposited ${realLong!.symbol}`,
          amount: lendAmountFormatted,
          dollarValue: +lendAmountFormatted * realLong!.priceUSD,
        },
      ],
      async tx(signer: Signer) {},
    });

    // 3. borrow short token
    txs.push({
      title: "Borrow",
      description: "Borrow from lending pool",
      balanceWillbe: [
        {
          name: realLong!.symbol,
          amount: longInputAmountFormatted,
          dollarValue: +longInputAmountFormatted * realLong!.priceUSD,
        },
        {
          name: `Deposited ${realLong!.symbol}`,
          amount: lendAmountFormatted,
          dollarValue: +lendAmountFormatted * realLong!.priceUSD,
        },
        {
          name: `Borrowed ${short!.symbol}`,
          amount: borrowAmountFormatted,
          dollarValue: +borrowAmountFormatted * short!.priceUSD,
        },
      ],
      async tx(signer: Signer) {},
    });
  }

  tasks.push({
    title: "Invest in UniswapV3",
    description: `${longInputAmountFormatted} ${realLong?.symbol} + ${borrowAmountFormatted} ${short?.symbol}`,
  });

  // 4. approve long token to toaster contract
  txs.push({
    title: "Approve",
    description: "Approve for Toaster",
    balanceWillbe:
      txs.length === 0 ? initBalances : txs[txs.length - 1].balanceWillbe,
    async tx(signer: Signer) {
      await ERC20__factory.connect(realLong!.address, signer).approve(
        invest!.meta.toaster,
        longInputAmount
      );
    },
  });

  // 5. approve short token to toaster
  if (hedge !== HEDGE.NO_HEDGE) {
    txs.push({
      title: "Approve",
      description: "Approve for Toaster",
      balanceWillbe: txs[txs.length - 1].balanceWillbe,
      async tx(signer: Signer) {
        await ERC20__factory.connect(short!.address, signer).approve(
          invest!.meta.toaster,
          borrowAmount
        );
      },
    });
  }
  // 6. toast
  txs.push({
    title: "Provide Liquidity",
    description: "Provide liquidity to the pool",
    // TODO
    balanceWillbe: txs[txs.length - 1].balanceWillbe,
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
    tasks,
    run,
  };
};
