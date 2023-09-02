import { InputStablecoin } from "./1-input-coin";
import { Pools } from "./2-pools";
import { TogglePanel } from "./TogglePanel";

export const Main = () => {
  return (
    <div className="mt-4 flex flex-col gap-8">
      <TogglePanel title="1️⃣ Input stablecoin">
        <InputStablecoin />
      </TogglePanel>
      <TogglePanel title="2️⃣ Pool">
        <Pools />
      </TogglePanel>
      <TogglePanel title="1️⃣ Range">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
      <TogglePanel title="1️⃣ Amount">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
    </div>
  );
};
