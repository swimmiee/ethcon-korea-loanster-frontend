import { Signer } from "ethers";
import { InvestDto } from "interfaces/invest.dto";
import { Token } from "interfaces/token.interface";
import { RANGE } from "states/position.state";
import { IApproveAndCall } from "typechain/uniswapV3/UniswapV3Toaster";
import { predictInvestUniswapV3 } from "./predictInvestUniswapV3";

export const swapAndAddLiquidityTx = (
  long: Token,
  short: Token,
  amtLong: bigint,
  amtShort: bigint,
  range: RANGE,
  invest: InvestDto,
  setSwapLongInput: (val: bigint) => void,
  setSwapShortInput: (val: bigint) => void
) => {
  return async (signer: Signer) => {
    const userAddress = await signer.getAddress();
    const { tickLower, tickUpper, swapAmountIn, isSwap0, toaster } =
      await predictInvestUniswapV3(
        signer.provider!,
        long,
        short,
        amtLong,
        amtShort,
        range,
        invest,
        setSwapLongInput,
        setSwapShortInput
      );
    const toasterItf = toaster.interface;

    const mintParams: IApproveAndCall.MintParamsStruct = {
      token0: invest.inputAssets[0],
      token1: invest.inputAssets[1],
      fee: invest.meta.feeTier,
      tickLower,
      tickUpper,
      amount0Min: 0,
      amount1Min: 0,
      recipient: userAddress,
    };

    const multicallData: string[] = [];
    if (amtLong > 0n) {
      multicallData.push(
        long.type === "NATIVE"
          ? toasterItf.encodeFunctionData("wrapETH", [amtLong])
          : toasterItf.encodeFunctionData("pull", [long.address, amtLong])
      );
    }

    if (amtShort > 0n) {
      multicallData.push(
        short.type === "NATIVE"
          ? toasterItf.encodeFunctionData("wrapETH", [amtShort])
          : toasterItf.encodeFunctionData("pull", [short.address, amtShort])
      );
    }

    const [tokenIn, tokenOut] = isSwap0
      ? [invest.inputAssets[0], invest.inputAssets[1]]
      : [invest.inputAssets[1], invest.inputAssets[0]];

    multicallData.push(
      toasterItf.encodeFunctionData("exactInputSingleBySelf", [
        {
          tokenIn,
          tokenOut,
          fee: invest.meta.feeTier,
          amountIn: swapAmountIn,
        },
      ])
    );

    multicallData.push(
      toasterItf.encodeFunctionData("approveZeroThenMax", [tokenIn]),
      toasterItf.encodeFunctionData("approveZeroThenMax", [tokenOut]),
      toasterItf.encodeFunctionData("mint", [mintParams])
    );

    // sweep garbage tokens
    multicallData.push(
      long.type === "NATIVE"
        ? toasterItf.encodeFunctionData("unwrapWETH9(uint256)", [0])
        : toasterItf.encodeFunctionData("sweepToken(address,uint256)", [
            long.address,
            0,
          ])
    );
    multicallData.push(
      short.type === "NATIVE"
        ? toasterItf.encodeFunctionData("unwrapWETH9(uint256)", [0])
        : toasterItf.encodeFunctionData("sweepToken(address,uint256)", [
            short.address,
            0,
          ])
    );

    await toaster.connect(signer)["multicall(bytes[])"](multicallData, {
      value:
        long.type === "NATIVE"
          ? amtLong
          : short.type === "NATIVE"
          ? amtShort
          : 0,
    });
  };
};
