import { LENDING_CONFIG } from "configs/lending.config";
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

export const getLendAndBorrowInfo = (
  long: Token,
  short: Token,
  amount: string,
  hedge: HEDGE
) => {
  const chainId = long.chainId;
  const longAmount = parseUnits(amount, long.decimals);

  // TODO
  const LTV = 0.7;
  const depositAmount =
    (longAmount * 100n * DEPOSIT_RATES[hedge]) /
    BigInt(Math.floor(10000 * (1 + LTV * BORROW_RATE)));

  const _borrowAmount =
    (((depositAmount * BigInt(10000 * (LTV * BORROW_RATE))) / 10000n) *
      BigInt(Math.floor((1000000 * long.priceUSD) / short.priceUSD))) /
    100000n;
  const borrowAmount =
    short.decimals >= long.decimals
      ? _borrowAmount * parseUnits("1", short.decimals - long.decimals)
      : _borrowAmount / parseUnits("1", long.decimals - short.decimals);

  const lend = LENDING_CONFIG[chainId].deposit[long.symbol];
  const borrow = LENDING_CONFIG[chainId].borrow[short.symbol];
  return {
    // TODO
    depositTo: lend?.depositTo ?? "",
    borrowFrom: borrow?.borrowFrom ?? "",
    lendingProtocol: lend?.name ?? "",
    depositAmount,
    longInputAmount: longAmount - depositAmount,
    borrowAmount,
  };
};
