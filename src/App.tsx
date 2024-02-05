import {
  ConnectWallet,
  Web3Button,
  useChainId,
  useContract,
  useContractRead,
  useContractWrite,
  useEmbeddedWallet,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const { connect } = useEmbeddedWallet();
  const chainId = useChainId();

  console.log("chainId", chainId);

  async function login() {
    try {
      const wallet = await connect({
        strategy: "google",
      });

      if (wallet) {
        const walletAddress = await wallet.getAddress();
        const email = wallet.getEmail();
        console.log({ walletAddress, email });
      } else {
        console.log(wallet, "Error signing in. Please try again later.");
        return false;
      }
    } catch (error) {
      console.error(`Error socialLogin: `, error);
      return false;
    }
  }

  return (
    <main className="main">
      <button onClick={login}>login</button>
      <ConnectWallet />
      <ContractInteractTest />
    </main>
  );
}

const contractStorage1 = "0x2603CFb7e08e31035c3C027b9C12aD66cBD3613A";

const abi = `[{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"retrieve","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"store","inputs":[{"type":"uint256","name":"num","internalType":"uint256"}]}]`;

function ContractInteractTest() {
  const { contract } = useContract(contractStorage1, abi);
  const value1 = useContractRead(contract, "retrieve");

  // write
  const { mutateAsync: store } = useContractWrite(contract, "store");

  async function call() {
    try {
      const data = await store({ args: [6] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  console.log("value1", value1.data);

  return (
    <div>
      <Web3Button
        contractAddress={contractStorage1}
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
      <button onClick={call}>Update Store value</button>

      <p>Store value: {value1.data ? value1.data.toString() : "loading..."}</p>
    </div>
  );
}
