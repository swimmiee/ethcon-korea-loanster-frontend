import { BalanceState } from "./services/tx.service";

interface BalanceGaugeProps {
  balanceWillbe: BalanceState[];
}
export const BalanceGauge = ({ balanceWillbe }: BalanceGaugeProps) => {
  const nextTotalBalance = balanceWillbe.reduce(
    (sum, { dollarValue }) => sum + +dollarValue,
    0
  );

  return (
    <div className="flex overflow-hidden border-2 border-black rounded-lg h-10">
      {balanceWillbe.map((b, i) => (
        <div
          key={i}
          className="h-full flex flex-col items-center justify-center"
          style={{
            background: ["#ffb700", "#aaff00","#00d0ff"][i],
            flex: nextTotalBalance > 0 ? b.dollarValue / nextTotalBalance : 1,
          }}
        >
          <p className="text-b-md -mb-[3px] font-bold">
            {b.name}
          </p>
          <p className="text-b-sm">(${b.dollarValue})</p>
        </div>
      ))}
    </div>
  );
};
