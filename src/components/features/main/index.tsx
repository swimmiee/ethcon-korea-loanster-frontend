import { TitledPanel } from "./TitledPanel";
import { RecommendedDeposits } from "./deposits/recommend";

export const Main = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-8">
      <TitledPanel title="🏦 Your Deposits">
      </TitledPanel>
      <TitledPanel title="💰 Your Borrows" />
      <TitledPanel title="🏨 Recommended Deposits">
      <RecommendedDeposits />
      </TitledPanel>
      <TitledPanel title="💵 Recommended Borrows" />
    </div>
  );
};