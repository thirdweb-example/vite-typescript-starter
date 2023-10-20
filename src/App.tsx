import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="main">
      <div className="container">
        <div
          className="header"
          style={{
            padding: "40px",
          }}
        >
          <div
            className="connect"
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <ConnectWallet
              modalSize="wide"
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
              btnTitle="wide modal"
            />

            <ConnectWallet
              modalSize="compact"
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
              btnTitle="compact modal"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
