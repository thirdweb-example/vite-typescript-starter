import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  comethConnect,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={"mumbai"}
      supportedWallets={[
        comethConnect({
          // apiKey: 'bef322c7-2612-4f91-ab1d-65c99c88c758',
          apiKey: "4153e44d-5af6-472e-86f5-4447ad6b8d12", // polygon mumbai
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
