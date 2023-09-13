import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  bloctoWallet,
  coinbaseWallet,
  frameWallet,
  localWallet,
  metamaskWallet,
  paperWallet,
  phantomWallet,
  rainbowWallet,
  safeWallet,
  smartWallet,
  trustWallet,
  walletConnect,
  zerionWallet,
} from "@thirdweb-dev/react";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);

const eoaWallets = [
  localWallet(),
  // paperWallet(),
  metamaskWallet({
    recommended: true,
  }),
  coinbaseWallet({
    recommended: true,
  }),
  walletConnect(),
  trustWallet(),
  rainbowWallet(),
  zerionWallet(),
  phantomWallet(),
  frameWallet(),
  bloctoWallet(),
];

function AppContainer() {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      supportedWallets={[
        ...eoaWallets,
        safeWallet({
          personalWallets: eoaWallets,
        }),
        smartWallet({
          factoryAddress: "0x219312a1c180B82abEE14FbDB4C9EE04E90c1809", // mumbai
          gasless: true,
          personalWallets: eoaWallets,
        }),
      ]}
    >
      <App />
    </ThirdwebProvider>
  );
}
