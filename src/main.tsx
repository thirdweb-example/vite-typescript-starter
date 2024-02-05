import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  embeddedWallet,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles/globals.css";
import { XrpLedgerEvmDevnetSidechain } from "@thirdweb-dev/chains";

const container = document.getElementById("root");
const root = createRoot(container!);

const customChain = {
  ...XrpLedgerEvmDevnetSidechain,
  chainId: 1440002,
};

root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={customChain}
      supportedChains={[customChain]}
      supportedWallets={[
        embeddedWallet({
          auth: {
            options: ["email", "google", "apple", "facebook"],
          },
        }),
        metamaskWallet(),
        walletConnect(),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
