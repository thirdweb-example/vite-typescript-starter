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
  const [isAWSManaged, setIsAWSManaged] = React.useState(false);

  return (
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      supportedWallets={[
        paperWallet({
          paperClientId: "62db6ab5-3165-4aac-b7a5-b52bb39e8d69",
          advancedOptions: {
            recoveryShareManagement: isAWSManaged
              ? "AWS_MANAGED"
              : "USER_MANAGED",
          },
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <div
        className="container"
        style={{
          marginBottom: "40px",
        }}
      >
        <h2>Paper Recovery Share Management </h2>

        <button
          className={isAWSManaged ? "selected" : ""}
          onClick={() => {
            setIsAWSManaged(true);
          }}
        >
          AWS_MANAGED
        </button>

        <button
          className={!isAWSManaged ? "selected" : ""}
          onClick={() => {
            setIsAWSManaged(false);
          }}
        >
          USER_MANAGED
        </button>
      </div>
      <App />
    </ThirdwebProvider>
  );
}
