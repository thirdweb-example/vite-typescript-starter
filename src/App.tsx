import {
  ThirdwebProvider,
  useAddress,
  useConnectionStatus,
  useDisconnect,
} from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Signer, Wallet } from "ethers";
import { useEffect, useRef, useState } from "react";

let setSignerOnMount = false;

export default function Home() {
  const [signer, setSigner] = useState<Signer | undefined>();
  const [count, setCount] = useState(0);

  const mounted = useRef(false);
  useEffect(() => {
    if (!setSignerOnMount) {
      return;
    }
    if (mounted.current) {
      return;
    }

    mounted.current = true;
    setSigner(Wallet.createRandom());
  }, []);

  console.log({ signer });

  return (
    <ThirdwebProvider
      signer={signer}
      clientId={import.meta.env.VITE_TEMPLATE_CLIENT_ID}
      activeChain="ethereum"
      dAppMeta={{
        name: "Foo Bar",
        url: "https://foobar.com",
      }}
    >
      <main className="main">
        <div className="container">
          <button
            className="btn"
            onClick={() => {
              setSigner(Wallet.createRandom());
            }}
          >
            {" "}
            Update signer on ThirdwebProvider{" "}
          </button>

          <div
            style={{
              height: "20px",
            }}
          ></div>

          <button
            className="btn"
            onClick={() => {
              setSigner(undefined);
            }}
          >
            {" "}
            Remove signer from ThirdwebProvider{" "}
          </button>

          <div
            style={{
              height: "20px",
            }}
          ></div>

          <AppContent />

          <button
            className="btn"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            {" "}
            Re-render ThirdwebProvider | count {count}
          </button>
        </div>
      </main>
    </ThirdwebProvider>
  );
}

function AppContent() {
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();
  const address = useAddress();

  return (
    <div>
      <h1> Signer wallet test </h1>

      {connectionStatus === "connected" && (
        <>
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
  );
}
