import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);

function AppWithProviders() {
  const [useWC, setUseWC] = React.useState(false);
  return (
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        metamaskWallet({
          connectionMethod: useWC ? "walletConnect" : "metamaskBrowser",
        }),
        coinbaseWallet(),
        walletConnect(),
      ]}
    >
      {/* two checkboxes  */}
      <div
        style={{
          padding: 20,
          border: "1px solid gray",
          flexDirection: "column",
          display: "flex",
          gap: 20,
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={useWC}
            onChange={(e) => setUseWC(e.target.checked)}
          />
          Connect with WalletConnect on mobile
        </label>

        <label>
          <input
            type="checkbox"
            checked={!useWC}
            onChange={(e) => setUseWC(!e.target.checked)}
          />
          Connect with Metamask browser on mobile
        </label>
      </div>

      <App />
    </ThirdwebProvider>
  );
}
