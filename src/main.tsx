import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  coinbaseWallet,
  magicLink,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={"arbitrum"}
      supportedWallets={[
        magicLink({
          apiKey: "pk_live_3EFC32B01A29985C", // Magic's demo API key
        }),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
