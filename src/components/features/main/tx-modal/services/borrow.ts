import { LendingMeta, LendingProtocol } from "configs/lending.config";
import { Signer } from "ethers";
import { Token } from "interfaces/token.interface";
import { AAVEPool__factory, LineaBankCore__factory } from "typechain";

export const borrow = (
  token: Token,
  amount: bigint,
  borrowFrom: string,
  lendingProtocol: LendingProtocol,
  meta: any
) => {
  // TODO: lendingProtocol별로 분기
  return async (signer: Signer) => {
    const userAddress = await signer.getAddress();
    if (lendingProtocol === "LineaBank") {
      const { lToken } = meta as LendingMeta<"LineaBank">;
      await LineaBankCore__factory.connect(borrowFrom, signer).borrow(
        lToken[token.symbol],
        amount
      ).then((tx) => tx.wait());
    } else {
      console.log({
        address: token.address,
        amount,
        userAddress
    })
      await AAVEPool__factory.connect(borrowFrom, signer).borrow(
        token.address,
        amount,
        2,
        0,
        userAddress
      ).then((tx) => tx.wait());
    }
  };
};
