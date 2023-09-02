import { LendingMeta, LendingProtocol } from "configs/lending.config";
import { Signer } from "ethers";
import { Token } from "interfaces/token.interface";
import { AAVEPool__factory, LineaBankCore__factory } from "typechain";

export const deposit = (
  token: Token,
  amount: bigint,
  depositTo: string,
  lendingProtocol: LendingProtocol,
  meta?: LendingMeta<any>
) => {
  // TODO: lendingProtocol별로 분기
  return async (signer: Signer) => {
    if (["AAVE", "Spark"].includes(lendingProtocol)) {
      await AAVEPool__factory.connect(depositTo, signer).deposit(
        token!.address,
        amount,
        await signer.getAddress(),
        0
      );
    }
    if (lendingProtocol === "LineaBank") {
      const { lToken } = meta as LendingMeta<"LineaBank">;
      await LineaBankCore__factory.connect(depositTo, signer).supply(
        lToken[token.symbol],
        amount
      );
    }
  };
};
