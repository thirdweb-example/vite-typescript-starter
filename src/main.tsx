import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Goerli, Mumbai } from "@thirdweb-dev/chains";

const container = document.getElementById("root");
const root = createRoot(container!);

export type AppChainId =
  | (typeof Mumbai)["chainId"]
  | (typeof Goerli)["chainId"];

function AppWithProviders() {
  const [appChainId, setAppChainId] = useState<AppChainId>(Mumbai.chainId);

  return (
    <ThirdwebProvider
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain={appChainId === Goerli.chainId ? Goerli : Mumbai}
      supportedChains={[Goerli, Mumbai]}
    >
      <App appChainId={appChainId} setAppChainId={setAppChainId} />
    </ThirdwebProvider>
  );
}

root.render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);
