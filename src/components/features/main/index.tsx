import { InputStablecoin } from "./1-input-coin";
import { Pools } from "./2-pools";
import { RangeSelection } from "./3-range";
import { Amount } from "./4-amount";
import { TogglePanel } from "./TogglePanel";
import { useModal } from "utils/hooks/useModal";
import { TxModal } from "./TxModal";

export const Main = () => {
  const [isOpen, openModal, closeModal] = useModal(false);
  return (
    <div className="mt-4 flex flex-col gap-8 mb-40">
      <TogglePanel title="1️⃣ Input stablecoin">
        <InputStablecoin />
      </TogglePanel>
      <TogglePanel title="2️⃣ Pool">
        <Pools />
      </TogglePanel>
      <TogglePanel title="3️⃣ Range">
        <RangeSelection />
      </TogglePanel>
      <TogglePanel title="4️⃣ Amount">
        <Amount />
      </TogglePanel>

      <button
        onClick={openModal}
        className="rounded-2xl hover:bg-primary bg-white w-full py-6 text-h-sm border-2 border-black "
      >
        Go!
      </button>
      {isOpen && <TxModal close={closeModal} />}
    </div>
  );
};
