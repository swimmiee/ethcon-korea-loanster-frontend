import { CoinSelector } from "./CoinSelector";
import { ChainSelector } from "./ChainSelector";

export const InputStablecoin = () => {
  // const { raw, setLong } = usePosition();
  return (
    <div>
      <p className="text-t-lg mb-2">Select chain</p>
      <ChainSelector />
      <p className="text-t-lg mt-4 mb-2">Select token</p>
      <CoinSelector />
    </div>
  );
};
