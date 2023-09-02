import { BalanceState } from "./tx.service";

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
            background: ["#FFFF00", "#ffb700", "#b7ff00"][i],
            flex: b.dollarValue / nextTotalBalance,
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
