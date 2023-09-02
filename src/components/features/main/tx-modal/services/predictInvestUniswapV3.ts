import { Provider } from "ethers";
import { InvestDto } from "interfaces/invest.dto";
import { Token } from "interfaces/token.interface";
import { RANGE } from "states/position.state";
import { UniswapV3Pool__factory, UniswapV3Toaster__factory } from "typechain";


const tickMultiplier = [3, 6, 10];

export const predictInvestUniswapV3 = async (
  provider: Provider,
  long: Token,
  short: Token,
  amtLong: bigint,
  amtShort: bigint,
  range: RANGE,
  invest: InvestDto,
  setSwapLongInput: (val: bigint) => void,
  setSwapShortInput: (val: bigint) => void
) => {
  const currentTick = await UniswapV3Pool__factory.connect(
    invest.address,
    provider
  )
    .slot0()
    .then(
      (slot0) =>
        Number(slot0.tick) - (Number(slot0.tick) % invest.meta.tickSpacing)
    );

  const [tickLower, tickUpper] = [
    currentTick - tickMultiplier[range] * invest.meta.tickSpacing,
    currentTick + tickMultiplier[range] * invest.meta.tickSpacing,
  ];

  const [token0, token1, amount0, amount1] =
    long.address.toLowerCase() < short.address.toLowerCase()
      ? [long.address, short.address, amtLong, amtShort]
      : [short.address, long.address, amtShort, amtLong];

  const toaster = UniswapV3Toaster__factory.connect(
    invest.meta.toaster,
    provider
  );

  const [swapAmountIn, swapAmountOut, isSwap0] =
    await toaster.getSwapAmountForAddLiquidity({
      pool: invest.address,
      tickUpper,
      tickLower,
      amount0,
      amount1,
      height: 96,
    });

  // isSwap0 is true and token0 is long
  // isSwap0 is false and token0 is short
  // -> 이 경우 Long 토큰을 swap하는 것이 된다.
  if (isSwap0 === (token0 === long.address)) {
    setSwapLongInput(swapAmountIn);
    setSwapShortInput(swapAmountOut);
  } else {
    setSwapLongInput(swapAmountOut);
    setSwapShortInput(swapAmountIn);
  }

  return {
    tickLower,
    tickUpper,
    swapAmountIn,
    swapAmountOut,
    isSwap0,
    toaster,
  };
};
