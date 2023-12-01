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
          <h3>Claim ERC1155 NFT on Fantom Testnet</h3>

          <Web3Button
            contractAddress="0xbE65bb2463C83748b4681869a4A97f11E91094D4" // fantom testnet
            action={async (contract) => {
              await contract.erc1155.claim(0, 1);
              alert("claimed successfully");
            }}
            onError={(e) => {
              alert(e.message);
              console.error(e.message);
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
