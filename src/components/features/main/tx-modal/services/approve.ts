import { Signer } from "ethers";
import { Token } from "interfaces/token.interface";
import { ERC20__factory } from "typechain";

export const approve = (token: Token, spender: string, amount: bigint) => {
  return async (signer: Signer) => {
    await ERC20__factory.connect(token.address, signer).approve(
      spender,
      amount
    );
  };
};
