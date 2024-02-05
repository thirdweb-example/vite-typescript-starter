import {
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
const abi = `[{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"retrieve","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"store","inputs":[{"type":"uint256","name":"num","internalType":"uint256"}]}]`;

export default function Home() {
  const { contract } = useContract(contractAddress, abi);
  const valueQuery = useContractRead(contract, "retrieve");
  const address = useAddress();
  const disconnect = useDisconnect();

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
            const data = await store({ args: [6] });
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
          : valueQuery.data}
      </p>

      {address && (
        <button
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </button>
      )}
    </main>
  );
}
