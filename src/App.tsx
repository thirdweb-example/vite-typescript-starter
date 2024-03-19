import {
  useAddress,
  useConnect,
  useConnectionStatus,
  useDisconnect,
  walletConnect,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

const config = walletConnect({
  projectId: "57e1cfc18509bb9cc4d51638ce8d18ed",
  recommended: true,
  qrModal: "walletConnect",
});

export default function Example() {
  const connect = useConnect();
  const disconnect = useDisconnect();
  const address = useAddress();
  const connectionStatus = useConnectionStatus();

  async function handleConnect() {
    await connect(config);
  }

  return (
    <main className="main">
      <div className="container">
        {connectionStatus !== "connected" && (
          <button onClick={handleConnect}>connect</button>
        )}

        <p> {connectionStatus === "connecting" && "opening modal..."}</p>

        {address && <p> connected to {address}</p>}

        {connectionStatus === "connected" && (
          <button onClick={disconnect}> disconnect </button>
        )}
      </div>
    </main>
  );
}
