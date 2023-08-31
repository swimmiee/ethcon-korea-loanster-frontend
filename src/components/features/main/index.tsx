import { InputStablecoin } from "./1-input-coin";
import { TogglePanel } from "./TogglePanel";

export const Main = () => {
  return (
    <div className="mt-4 flex flex-col gap-8">
      <TogglePanel title="1️⃣ Input stablecoin" description="Select input token">
        <InputStablecoin />
      </TogglePanel>
      <TogglePanel title="2️⃣ Pool" description="">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
      <TogglePanel title="1️⃣ Range" description="">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
      <TogglePanel title="1️⃣ Amount" description="">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
    </div>
  );
};
