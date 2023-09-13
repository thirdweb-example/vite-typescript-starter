import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <div className="connect">
            <ConnectWallet
              modalSize="compact"
              dropdownPosition={{
                side: "bottom",
                align: "start",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
