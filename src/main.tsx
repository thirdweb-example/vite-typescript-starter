import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  paperWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);

function AppContainer() {
  // const [isAWSManaged, setIsAWSManaged] = React.useState(false);

  return (
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      supportedWallets={[
        paperWallet({
          clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
          advancedOptions: {
            recoveryShareManagement: "AWS_MANAGED",
          },
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <div className="container"></div>
      <App />
    </ThirdwebProvider>
  );
}
