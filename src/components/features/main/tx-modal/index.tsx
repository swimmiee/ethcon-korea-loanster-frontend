import Modal from "components/materials/Modal";
import { useTx } from "./tx.service";

interface TxModalProps {
  close: () => void;
}
export const TxModal = ({ close }: TxModalProps) => {
  const { step, txs, run } = useTx();
  return (
    <Modal title="Lend & Invest" closeModal={close} closable={false}>
      <div className="p-4 flex flex-col">
        <div className="flex [&>*]:h-6 [&>*]:flex overflow-hidden rounded-lg border-black border-4">
          <div className="bg-primary" style={{ flex: step + 1 }} />
          {step < txs.length && <div style={{ flex: txs.length - step }} />}
        </div>

        <p className="text-center text-t-xl my-4">
          {step + 1}/{txs.length} {txs[step].description}
        </p>
        <button
          onClick={run}
          className="rounded-2xl py-3 bg-backgrounds hover:bg-primary border-black border-1.5 "
        >
          {txs[step].title}
        </button>
      </div>
    </Modal>
  );
};
