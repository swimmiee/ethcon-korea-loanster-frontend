import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { WagmiConfig } from "wagmi";
import wagmiConfig from "configs/wagmi.config.ts";
// @ts-ignore
import { ConnectKitProvider } from "connectkit";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <WagmiConfig config={wagmiConfig}>
      <ConnectKitProvider
        customTheme={{
          "--ck-body-background": "#eeeeee",
          "--ck-primary-button-hover-background": "#FFFF00",
          "--ck-secondary-button-hover-background": "#FFFF00",
          "--ck-overlay-background": "#00000040",
        }}
        theme="retro"
        // mode="dark"
      >
        <App />
      </ConnectKitProvider>
    </WagmiConfig>
  </RecoilRoot>
);
