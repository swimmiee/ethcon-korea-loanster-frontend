import { Signer, formatUnits } from "ethers";
import { useState } from "react";
import { HEDGE, usePosition } from "states/position.state";
import { getLendAndBorrowInfo } from "streams/getLendAndBorrowInfo";
import { ERC20__factory, AAVEPool__factory } from "typechain";
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
    depositAmount,
    longInputAmount,
    borrowAmount,
    depositTo,
    lendingProtocol,
  } = getLendAndBorrowInfo(realLong!, short!, amount, hedge);

  const longInputAmountFormatted = toFixedCond(
    formatUnits(longInputAmount, realLong?.decimals)
  );
  const depositAmountFormatted = toFixedCond(
    formatUnits(depositAmount, realLong?.decimals)
  );
  const borrowAmountFormatted = toFixedCond(
    formatUnits(borrowAmount, short?.decimals)
  );

  const initBalances = [
    {
      name: realLong!.symbol,
      amount,
      dollarValue: +amount * realLong!.priceUSD,
    },
  ];

  if (hedge !== HEDGE.NO_HEDGE) {
    tasks.push({
      title: `Hedge with ${lendingProtocol}`,
      description: `Deposit ${depositAmountFormatted} ${realLong?.symbol} → Lend ${borrowAmountFormatted} ${short?.symbol}`,
    });

    // 1. approve to lending pool
    txs.push({
      title: "Approve",
      description: `Approve ${depositAmountFormatted} ${
        realLong!.symbol
      } for lending pool`,
      balanceWillbe: initBalances,
      async tx(signer: Signer) {
        await ERC20__factory.connect(realLong!.address, signer).approve(
          depositTo,
          depositAmount
        );
      },
    }); // TODO: depositAmount -> depositAmount로 바꾸면 좋을 거 같습니다...

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
          amount: depositAmountFormatted,
          dollarValue: +depositAmountFormatted * realLong!.priceUSD,
        },
      ],
      // TODO: DEPOSIT
      // use this:
      // `depositTo` -> lending pool 주소
      // `depositAmount` -> lending amount(bigint)
      async tx(signer: Signer) {
        await AAVEPool__factory.connect(depositTo, signer).deposit(
          realLong!.address,
          depositAmount,
          await signer.getAddress(),
          0
        );
      },
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
          amount: depositAmountFormatted,
          dollarValue: +depositAmountFormatted * realLong!.priceUSD,
        },
        {
          name: short!.symbol,
          amount: borrowAmountFormatted,
          dollarValue: +borrowAmountFormatted * short!.priceUSD,
        },
      ],
      // TODO: BORROW
      // use this:
      // `borrowFrom` -> 빌리는 곳 주소
      // `borrowAmount` -> borrow amount(bigint)
      async tx(signer: Signer) {
        await AAVEPool__factory.connect(depositTo, signer).borrow(
          realLong!.address,
          borrowAmount,
          1,
          0,
          await signer.getAddress()
        );
      },
    });
  }

  tasks.push({
    title: "Invest in UniswapV3",
    description: `Add ${longInputAmountFormatted} ${realLong?.symbol} + ${borrowAmountFormatted} ${short?.symbol}`,
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
    // TODO amount prediction
    balanceWillbe: txs[txs.length - 1].balanceWillbe,
    // TODO
    // long token: `longInputAmount`
    // short token: `borrowAmount`
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
