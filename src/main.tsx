import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  bloctoWallet,
  coinbaseWallet,
  darkTheme,
  embeddedWallet,
  frameWallet,
  localWallet,
  magicLink,
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
import { defaultChains, FncyTestnet } from "@thirdweb-dev/chains";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);

const eoaWallets = [
  // localWallet(),
  // embeddedWallet(),
  paperWallet(),
  // magicLink({
  //   oauthOptions: {
  //     providers: ["google", "facebook", "twitter", "apple"],
  //   },
  //   apiKey: "pk_live_3EFC32B01A29985C", // demo key
  // }),
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
  const [enableSmartWallet, setEnableSmartWallet] = useState(false);

  const wallets = [
    ...eoaWallets,
    safeWallet({
      personalWallets: eoaWallets,
    }),
  ];

  const walletConfigs = enableSmartWallet
    ? wallets.map((wallet) =>
        smartWallet(wallet, {
          factoryAddress: "0x219312a1c180B82abEE14FbDB4C9EE04E90c1809",
          gasless: true,
        })
      )
    : wallets;

  return (
    <ThirdwebProvider
      // theme={darkTheme({
      //   colors: {
      //     modalBg: "black",
      //     dropdownBg: "black",
      //     accentText: "yellow",
      //     primaryButtonBg: "yellow",
      //     primaryButtonText: "black",
      //     connectedButtonBg: "black",
      //   },
      // })}
      activeChain="mumbai"
      key={wallets.map((w) => w.id).join(",") + enableSmartWallet}
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      supportedWallets={walletConfigs}
      supportedChains={[...defaultChains, FncyTestnet]}
    >
      <div
        style={{
          display: "flex",
          padding: "20px",
          alignItems: "center",
          gap: "10px",
        }}
      >
        Enable Smart Wallet
        <input
          type="checkbox"
          checked={enableSmartWallet}
          onChange={(e) => {
            setEnableSmartWallet(e.target.checked);
          }}
          style={{
            width: "20px",
            height: "20px",
          }}
        />
        ({enableSmartWallet ? "enabled" : "disabled"})
      </div>
      <App />
    </ThirdwebProvider>
  );
}
