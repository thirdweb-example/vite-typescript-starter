import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  bloctoWallet,
  coinbaseWallet,
  darkTheme,
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
