import { Main } from "components/features/main";
import Background from "components/layouts/Background";
import { Header } from "components/layouts/header";
import { MaxWidth } from "components/layouts/MaxWidth";

export const MainPage = () => {
  return (
    <Background>
      <Header />
      <MaxWidth>
        <Main />
      </MaxWidth>
    </Background>
  );
};
