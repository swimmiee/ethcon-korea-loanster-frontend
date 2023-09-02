import { ImSpinner10 } from "react-icons/im";

interface ProgressBarProps {
  step: number;
  txsLength: number;
}
export const ProgressBar = ({ step, txsLength }: ProgressBarProps) => {
  return (
    <div className="flex [&>*]:h-8 [&>*]:flex overflow-hidden rounded-lg border-black border-2">
      <div
        className="bg-primary flex gap-2 items-center justify-center"
        style={{ flex: step + 1 }}
      >
        <ImSpinner10 size={14} className="animate-spin" />
        <p className="text-t-md">
          {step + 1} / {txsLength}
        </p>
      </div>
      {step < txsLength && <div style={{ flex: txsLength - step - 1 }} />}
    </div>
  );
};
