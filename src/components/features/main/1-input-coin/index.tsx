import { CoinSelector } from "./CoinSelector";
import { ChainSelector } from "./ChainSelector";

export const InputStablecoin = () => {
  return (
    <div>
      <p className="text-t-lg mb-2">Select chain</p>
      <ChainSelector />
      <p className="text-t-lg mt-4 mb-2">Select Token</p>
      <CoinSelector />
    </div>
  );
};
