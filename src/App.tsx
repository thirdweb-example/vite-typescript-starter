import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
  useDisconnect,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

// https://evm-sidechain.xrpl.org/address/0x2603CFb7e08e31035c3C027b9C12aD66cBD3613A/contracts#address-tabs
const contractAddress = "0x2603CFb7e08e31035c3C027b9C12aD66cBD3613A";

export default function Home() {
  const { contract } = useContract(contractAddress);
  const valueQuery = useContractRead(contract, "retrieve");

  console.log("valueQuery", valueQuery.data);
  // write
  const { mutateAsync: store } = useContractWrite(contract, "store");

  return (
    <main
      className="main"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Web3Button
        contractAddress={contractAddress}
        action={async () => {
          try {
            const num = Math.floor(Math.random() * 100); // random number between 0 and 100
            const data = await store({ args: [num] });
            console.info("contract call successs", data);
          } catch (err) {
            console.error("contract call failure", err);
          }
        }}
      >
        Update Store value
      </Web3Button>

      <p>
        Store value:{" "}
        {valueQuery.isLoading
          ? "Loading..."
          : valueQuery.isError
          ? "Error"
          : valueQuery.data.toString()}
      </p>

      <ConnectWallet />
    </main>
  );
}
