import { Signer, formatUnits, parseUnits } from "ethers";
import { useState } from "react";
import { HEDGE, usePosition } from "states/position.state";
import { getLendAndBorrowInfo } from "streams/getLendAndBorrowInfo";
import { LineaBankCore__factory } from "typechain";
import { toFixedCond } from "utils/formatter";
import { useGetSigner } from "utils/useGetSigner";
import { swapAndAddLiquidityTx } from "./swapAndAddLiquidity";
import { toBalanceState } from "./balanceState";
import { deposit } from "./deposit";
import { approve } from "./approve";
import { borrow } from "./borrow";
import { predictInvestUniswapV3 } from "./predictInvestUniswapV3";
import { getProvider } from "utils/getProvider";
import { Token } from "interfaces/token.interface";

export interface BalanceState {
  name: string; // USDC, Deposited USDC, ...
  amount: string;
  dollarValue: number;
}
interface Tx {
  title: string;
  description: string;
  balanceWillbe: BalanceState[];
  predict?: () => Promise<void>;
  tx: (signer: Signer) => Promise<void>;
}
export interface Task {
  title: string;
  description: string;
}

export const useTx = () => {
  const { hedge, amount, realLong, chain, invest, short, poolRange } =
    usePosition();
  const [step, setStep] = useState<number>(0);
  const getSigner = useGetSigner();
  const txs: Tx[] = [];
  const tasks: Task[] = []; // just for display

  const protocol = getLendAndBorrowInfo(realLong!, short!, amount, hedge);
  const longInputAmount = protocol
    ? protocol.longInputAmount
    : parseUnits(amount, realLong?.decimals);

  const longInputAmountFormatted = toFixedCond(
    formatUnits(longInputAmount, realLong?.decimals)
  );
  const [swapLongInput, setSwapLongInput] = useState<bigint>(longInputAmount);
  const [swapShortInput, setSwapShortInput] = useState<bigint>(0n);

  const depositAmountFormatted = toFixedCond(
    formatUnits(protocol ? protocol.depositAmount : 0, realLong?.decimals)
  );
  const borrowAmountFormatted = toFixedCond(
    formatUnits(protocol ? protocol.borrowAmount : 0, short?.decimals)
  );

  const initBalances = toBalanceState([[realLong!, longInputAmount]]);

  if (hedge !== HEDGE.NO_HEDGE && protocol) {
    const {
      lendingProtocol,
      depositTo,
      depositAmount,
      borrowAmount,
      borrowFrom,
    } = protocol;
    tasks.push({
      title: `Hedge with ${lendingProtocol}`,
      description: `Deposit ${depositAmountFormatted} ${realLong?.symbol} → Lend ${borrowAmountFormatted} ${short?.symbol}`,
    });

    // 1. approve to lending pool
    txs.push({
      title: "Approve",
      description: `Approve ${depositAmountFormatted} ${
        realLong!.symbol
      } for ${lendingProtocol}`,
      balanceWillbe: initBalances,
      tx: approve(realLong!, depositTo, depositAmount),
    });

    // 2. deposit stable coin
    txs.push({
      title: "Deposit",
      description: `Deposit to ${lendingProtocol}`,
      balanceWillbe: toBalanceState([
        [realLong!, longInputAmount],
        [realLong!, depositAmount],
      ]),
      tx: deposit(
        realLong!,
        depositAmount,
        depositTo,
        lendingProtocol,
        protocol.meta
      ),
    });

    // 2-1. lineabank의 경우 enter market 추가
    if (lendingProtocol === "LineaBank") {
      txs.push({
        title: "Enter Markets",
        description: "Use to Collateral",
        balanceWillbe: txs[txs.length - 1].balanceWillbe,
        async tx(signer: Signer) {
          await LineaBankCore__factory.connect(depositTo, signer).enterMarkets([
            realLong!.address,
          ]);
        },
      });
    }

    // 3. borrow short token
    txs.push({
      title: "Borrow",
      description: `Borrow from ${lendingProtocol}`,
      balanceWillbe: toBalanceState([
        [realLong!, longInputAmount],
        [short!, borrowAmount],
        [realLong!, depositAmount],
      ]),
      tx: borrow(
        short!,
        borrowAmount,
        borrowFrom,
        lendingProtocol,
        protocol.meta
      ),
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
    tx: approve(realLong!, invest!.meta.toaster, longInputAmount),
  });

  // 5. approve short token to toaster
  if (hedge !== HEDGE.NO_HEDGE && protocol) {
    txs.push({
      title: "Approve",
      description: "Approve for Toaster",
      balanceWillbe: txs[txs.length - 1].balanceWillbe,
      tx: approve(short!, invest!.meta.toaster, protocol.borrowAmount),
    });
  }
  // 6. toast
  const lastBalanceState:  [Token, bigint][] = [
    [realLong!, longInputAmount - swapLongInput],
    [short!, swapShortInput],
  ];
  if (hedge !== HEDGE.NO_HEDGE && protocol) {
    lastBalanceState.push([
      realLong!,
      protocol.depositAmount,
    ]);
  }
  txs.push({
    title: "Provide Liquidity",
    description: `Provide liquidity to the ${invest!.project}`,
    // TODO amount prediction
    balanceWillbe: toBalanceState(lastBalanceState),
    async predict() {
      await predictInvestUniswapV3(
        getProvider(chain),
        realLong!,
        short!,
        longInputAmount,
        protocol ? protocol.borrowAmount : 0n,
        poolRange,
        invest!,
        setSwapLongInput,
        setSwapShortInput
      );
    },
    tx: swapAndAddLiquidityTx(
      realLong!,
      short!,
      longInputAmount,
      protocol ? protocol.borrowAmount : 0n,
      poolRange,
      invest!,
      setSwapLongInput,
      setSwapShortInput
    ),
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
    initBalances,
  };
};
