import {
  useConnect,
  useConnectionStatus,
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
  const connectionStatus = useConnectionStatus();

  async function handleConnect() {
    await connect(config);
  }

  return (
    <main className="main">
      <div className="container">
        <button onClick={handleConnect}>connect</button>
        <p> {connectionStatus === "connecting" && "Connecting...."}</p>
      </div>
    </main>
  );
}
