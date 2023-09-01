import { SelectInputCoin } from "./1-select-input-coin";
import { TogglePanel } from "./TogglePanel";

export const Main = () => {
  return (
    <div className="mt-4 flex flex-col gap-8">
      <TogglePanel title="1️⃣ Input stablecoin" height="h-[400px]">
        <SelectInputCoin />
      </TogglePanel>
      <TogglePanel title="2️⃣ Pool" height="h-[400px]">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
      <TogglePanel title="1️⃣ Range" height="h-[400px]">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
      <TogglePanel title="1️⃣ Amount" height="h-[400px]">
        <p>asdsadasdasdasdasdas</p>
      </TogglePanel>
    </div>
  );
};