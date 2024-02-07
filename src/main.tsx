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

// const customChain = {
//   chainId: 1440002,
//   rpc: ["https://rpc-evm-sidechain.xrpl.org"],
//   nativeCurrency: {
//     decimals: 18,
//     name: "XRP",
//     symbol: "XRP",
//   },
//   shortName: "XRPL",
//   slug: "XRPL",
//   testnet: true,
//   chain: "XRPL EVM Sidechain Devnet",
//   name: "XRPL EVM Sidechain Devnet",
// };

const customChain = {
  ...XrpLedgerEvmDevnetSidechain,
  chainId: 1440002,
};
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={customChain}
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
