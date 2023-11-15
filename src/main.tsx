import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  defaultWallets,
  safeWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import "./styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "goerli";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppWithProvider />
  </React.StrictMode>
);

function AppWithProvider() {
  const [mode, setMode] = useLocalStorageState<"smart" | "safe" | "normal">(
    "mode",
    "normal"
  );

  let wallets = defaultWallets;

  if (mode === "smart") {
    wallets = wallets.map((w) => {
      return smartWallet(w, {
        factoryAddress: "0xE38fAC32BbA9F1Fe700a5D7f5630236171fa87e4", // goerli
        gasless: true,
      });
    });
  } else if (mode === "safe") {
    wallets = [
      ...wallets,
      safeWallet({
        personalWallets: wallets,
      }),
    ];
  }

  return (
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={wallets}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "20px",
        }}
      >
        <button
          onClick={() => setMode("normal")}
          data-active={mode === "normal"}
        >
          Normal
        </button>
        <button onClick={() => setMode("smart")} data-active={mode === "smart"}>
          smart wallets
        </button>
        <button onClick={() => setMode("safe")} data-active={mode === "safe"}>
          wallets + safe
        </button>
      </div>
      <App />
    </ThirdwebProvider>
  );
}

function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.warn(error);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(error);
    }
  }, [key, state]);

  return [state, setState] as const;
}
