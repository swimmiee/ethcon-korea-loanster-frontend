import Modal from "components/materials/Modal";
import { useTx } from "./tx.service";
import { Stepper } from "./Stepper";
import { ImSpinner10 } from "react-icons/im";
import { BalanceGauge } from "./BalanceGauge";
import { balancesState } from "states/balances.state";
import { ProgressBar } from "./ProgressBar";
interface TxModalProps {
  close: () => void;
}
export const TxModal = ({ close }: TxModalProps) => {
  const { step, txs, tasks, run } = useTx();
  const currentTx = txs[step];

  return (
    <Modal title="Lend & Invest" size="lg" closeModal={close} closable={false}>
      {/* PROGRESS BAR */}
      <div className="px-4">
        <p>Progress to do</p>
        <hr className="mb-3" />
        <ProgressBar step={step} txsLength={txs.length} />
      </div>
      <div className="flex flex-col px-4 mt-4">
        <p>Your balances will be</p>
        <hr className="mb-3" />
        <BalanceGauge balanceWillbe={currentTx.balanceWillbe} />
      </div>

      <div className="px-4 mt-4">
        <p>Next Transaction</p>
        <hr className="mb-3" />
        <div className="flex pb-4 divide-x">
          {/* STEPPER */}
          <Stepper tasks={tasks} />

          <div className="flex flex-1 flex-col justify-center px-4 gap-4">
            <p className="text-center text-t-lg py-4">
              {currentTx.description}
            </p>
            <button
              onClick={run}
              className="rounded-2xl py-3 bg-backgrounds hover:bg-primary border-black border-1.5 "
            >
              {currentTx.title}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
