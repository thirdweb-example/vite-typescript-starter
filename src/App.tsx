import { ConnectWallet, Web3Button, useWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const wallet = useWallet();
  return (
    <main className="main">
      <div
        className="container"
        style={{
          paddingTop: 30,
        }}
      >
        <div className="header">
          <div className="connect">
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />
          </div>
        </div>

        <br />
        <div>
          {wallet && (
            <button
              className="btn"
              onClick={async () => {
                await wallet.signMessage("hello world");
                alert("signed successfully");
              }}
            >
              sign message{" "}
            </button>
          )}

          <br />
          <br />
          <br />

          <Web3Button
            contractAddress="0x88f54479F9DB46c2d97823D01CC316aa88B54a33" // mumbai
            action={async (contract) => {
              await contract.erc1155.claim(0, 1);
              alert("claimed successfully");
            }}
            onError={(e) => {
              alert("Error");
              console.error(e);
            }}
            onSuccess={(data) => {
              alert("minted successfully");
            }}
            onSubmit={() => {
              console.log("Submitting");
            }}
          >
            ERC1155: Claim 1 NFT
          </Web3Button>
        </div>
      </div>
    </main>
  );
}
