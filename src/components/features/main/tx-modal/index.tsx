import Modal from "components/materials/Modal";
import { useTx } from "./services/tx.service";
import { Stepper } from "./Stepper";
import { BalanceGauge } from "./BalanceGauge";
import { ProgressBar } from "./ProgressBar";
import { useEffect } from "react";
import { FaArrowDownLong } from "react-icons/fa6";

interface TxModalProps {
  close: () => void;
}
export const TxModal = ({ close }: TxModalProps) => {
  const { step, txs, tasks, initBalances, run } = useTx();
  const currentTx = step >= txs.length ? txs[tasks.length - 1] : txs[step];
  const beforeBalance = step > 0 ? txs[step - 1].balanceWillbe : initBalances;

  useEffect(() => {
    if (currentTx.predict) {
      currentTx.predict();
    }
  }, [step]);

  return (
    <Modal title="Lend & Invest" size="lg" closeModal={close} closable={false}>
      {step >= txs.length ? (
        <div className="h-[480px] flex items-center justify-center">
          <p className="text-d-sm">Transaction Done!</p>
        </div>
      ) : (
        <>
          {/* PROGRESS BAR */}
          <div className="px-4">
            <p>Progress to do</p>
            <hr className="mb-3" />
            <ProgressBar step={step} txsLength={txs.length} />
          </div>
          <div className="flex flex-col px-4 mt-4">
            <p>Your balances will be</p>
            <hr className="mb-3" />
            {!currentTx.title.includes("Approve") && (
              <>
                <BalanceGauge balanceWillbe={beforeBalance} />
                <div className="flex justify-center my-3">
                  <FaArrowDownLong />
                </div>
              </>
            )}

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
        </>
      )}
    </Modal>
  );
};
