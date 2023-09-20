import {
  ConnectWallet,
  ThirdwebProvider,
  WalletConfig,
  coinbaseWallet,
  metamaskWallet,
  rainbowWallet,
  signerWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
  walletConnect,
} from "@thirdweb-dev/react";
import type { SignerWallet } from "@thirdweb-dev/wallets";
import "./styles/Home.css";
import { ethers } from "ethers";

export default function Home() {
  const fooBarWallet = signerWallet({
    async getSigner() {
      // just an example
      // create a random signer
      const wallet = ethers.Wallet.createRandom();
      // some fake delay to simulate a real wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return wallet; // wallet is a signer
    },
    meta: {
      name: "Foo Bar",
      iconURL:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJNMzk0IDQ4MGExNiAxNiAwIDAgMS05LjM5LTNMMjU2IDM4My43NiAxMjcuMzkgNDc3YTE2IDE2IDAgMCAxLTI0LjU1LTE4LjA4TDE1MyAzMTAuMzUgMjMgMjIxLjJhMTYgMTYgMCAwIDEgOS0yOS4yaDE2MC4zOGw0OC40LTE0OC45NWExNiAxNiAwIDAgMSAzMC40NCAwbDQ4LjQgMTQ5SDQ4MGExNiAxNiAwIDAgMSA5LjA1IDI5LjJMMzU5IDMxMC4zNWw1MC4xMyAxNDguNTNBMTYgMTYgMCAwIDEgMzk0IDQ4MHoiIHN0eWxlPSJmaWxsOiByZ2IoMjQ3LCAyMjAsIDExMSk7Ij48L3BhdGg+PC9zdmc+",
    },
  });

  return (
    <ThirdwebProvider
      supportedWallets={[
        fooBarWallet,
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain="ethereum"
      dAppMeta={{
        name: "Foo Bar",
        url: "https://foobar.com",
      }}
    >
      <AppContent fooBarWallet={fooBarWallet} />
    </ThirdwebProvider>
  );
}

function AppContent(props: { fooBarWallet: WalletConfig<SignerWallet> }) {
  const connect = useConnect();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  return (
    <main className="main">
      <div className="container">
        <h1> Signer wallet test </h1>

        <p> Connecting with ConnectWallet </p>
        <ConnectWallet
          modalSize="compact"
          dropdownPosition={{
            align: "start",
            side: "bottom",
          }}
        />

        <div
          style={{
            height: "40px",
          }}
        ></div>

        {connectionStatus !== "connected" && (
          <>
            <p> Connecting with useConnect hook </p>
            <button
              className="btn"
              onClick={async () => {
                console.log("connecting....");
                const wallet = await connect(props.fooBarWallet);
                console.log("connected");
                console.log(wallet);
              }}
            >
              {connectionStatus === "connecting"
                ? "Connecting..."
                : "Custom Connect"}
            </button>
          </>
        )}

        {connectionStatus === "connected" && (
          <>
            <p> disconnecting with useDisconnect hook </p>
            <button
              className="btn"
              onClick={() => {
                disconnect();
              }}
            >
              disconnect
            </button>
          </>
        )}

        <div
          style={{
            height: "40px",
          }}
        ></div>

        <p> Connectiong status : {connectionStatus}</p>
        {address && <p> address: {address}</p>}
      </div>
    </main>
  );
}
