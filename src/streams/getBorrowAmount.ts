import { parseUnits } from "ethers";
import { Token } from "interfaces/token.interface";
import { HEDGE } from "states/position.state";

// User borrows ltv * BORROW_RATE
const BORROW_RATE = 0.67;
const DEPOSIT_RATES = {
  [HEDGE.NO_HEDGE]: 0n,
  [HEDGE.STANDARD]: 30n,
  [HEDGE.STRONG]: 70n,
  [HEDGE.NEUTRAL]: 100n,
};

export const getLendAndBorrowAmount = (
  long: Token,
  short: Token,
  amount: string,
  hedge: HEDGE
) => {
  const longAmount = parseUnits(amount, long.decimals);

  // TODO
  const LTV = 0.7;
  const lendAmount =
    (longAmount * 100n * DEPOSIT_RATES[hedge]) /
    BigInt(Math.floor(10000 * (1 + LTV * BORROW_RATE)));

  const _borrowAmount =
    (((lendAmount * BigInt(10000 * (LTV * BORROW_RATE))) / 10000n) *
      BigInt(Math.floor(1000000 * long.priceUSD / short.priceUSD))) /
    100000n;
  const borrowAmount = short.decimals >= long.decimals ?
    _borrowAmount * parseUnits("1", short.decimals - long.decimals) :
    _borrowAmount / parseUnits("1", long.decimals - short.decimals);

  return {
    // TODO
    lendingPool: "",
    borrowFrom: "",
    lendingProtocol: "SPARK",
    lendAmount,
    longInputAmount: longAmount - lendAmount,
    borrowAmount, // TODO
  };
};
