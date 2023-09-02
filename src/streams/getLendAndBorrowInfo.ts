import { parseUnits } from "ethers";
import { Token } from "interfaces/token.interface";
import { HEDGE } from "states/position.state";
import { findLendingProtocol } from "./findLendingProtocol";

// User borrows ltv * BORROW_RATE
export const BORROW_RATE = 0.67;
export const DEPOSIT_RATES = {
  [HEDGE.NO_HEDGE]: 0n,
  [HEDGE.STANDARD]: 20n,
  [HEDGE.MILD]: 40n,
  [HEDGE.FULL]: 100n,
};

export const getLendAndBorrowInfo = (
  long: Token,
  short: Token,
  amount: string,
  hedge: HEDGE
) => {
  const longAmount = parseUnits(amount, long.decimals);

  const protocol = findLendingProtocol(long, short);
  if (!protocol) return null;

  // TODO
  const LTV = protocol.depositToken.ltv;
  // $deposit = $totalAmount / (1 + LTV * BORROW_RATE)
  const depositAmount =
    (longAmount * 100n * DEPOSIT_RATES[hedge]) /
    BigInt(Math.floor(10000 * (1 + LTV * BORROW_RATE)));

  // $borrow = $deposit * (LTV * BORROW_RATE)
  const _borrowAmount =
    (((depositAmount * BigInt(10000 * (LTV * BORROW_RATE))) / 10000n) *
      BigInt(Math.floor((100000 * long.priceUSD) / short.priceUSD))) /
    100000n;

  // adjust decimals
  const borrowAmount =
    short.decimals >= long.decimals
      ? _borrowAmount * parseUnits("1", short.decimals - long.decimals)
      : _borrowAmount / parseUnits("1", long.decimals - short.decimals);

  return {
    depositTo: protocol.core,
    borrowFrom: protocol.core,
    lendingProtocol: protocol.name,
    depositAmount,
    longInputAmount: longAmount - depositAmount,
    borrowAmount,
    meta: protocol.meta,
  };
};
