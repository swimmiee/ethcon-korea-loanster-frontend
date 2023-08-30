import { MainPage } from "components/pages/Main";
import { useSyncAccount } from "states/account.state";

function App() {
  useSyncAccount();
  return <MainPage />;
}

export default App;
