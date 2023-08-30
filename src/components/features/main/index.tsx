import { TitledPanel } from "./TitledPanel";

export const Main = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-8">
      <TitledPanel title="🏦 Your Deposits" />
      <TitledPanel title="💰 Your Borrows" />
      <TitledPanel title="🏨 Recommended Deposits" />
      <TitledPanel title="💵 Recommended Borrows" />
    </div>
  );
};