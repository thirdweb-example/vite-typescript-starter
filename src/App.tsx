import {
  ConnectEmbed,
  ConnectWallet,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const connectionStatus = useConnectionStatus();

  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <div
            className="connect"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
        </div>

        <div>connectionStatus: {connectionStatus}</div>

        {connectionStatus !== "connected" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          >
            <ConnectEmbed />
          </div>
        )}

        {connectionStatus === "connected" && <p> CONNECTED </p>}
      </div>
    </main>
  );
}
