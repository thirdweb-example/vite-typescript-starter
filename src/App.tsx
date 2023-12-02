import { ConnectEmbed, ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  return (
    <main>
      <div
        className="main"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          paddingTop: "50px",
        }}
      >
        <ConnectEmbed />
      </div>

      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          paddingTop: "50px",
        }}
      >
        <ConnectWallet />
      </div>
    </main>
  );
}
