import {
  ConnectWallet,
  Web3Button,
  useChainId,
  useConnectionStatus,
  useSwitchChain,
} from "@thirdweb-dev/react";
import { Mumbai, Goerli } from "@thirdweb-dev/chains";
import "./styles/Home.css";
import { useEffect } from "react";
import { AppChainId } from "./main";

export default function App(props: {
  setAppChainId: (chainId: AppChainId) => void;
  appChainId: AppChainId;
}) {
  const chainId = useChainId();
  const { appChainId } = props;

  useEffect(() => {
    // if user is connected to another supported chain, update the activeChain in thirdweb provider
    if (chainId && chainId !== appChainId) {
      if (chainId === Mumbai.chainId || chainId === Goerli.chainId) {
        console.log("updating app chain id in thirdweb provider to", chainId);
        props.setAppChainId(chainId);
      }
    }
  }, [chainId, appChainId]);

  const connectionStatus = useConnectionStatus();
  return (
    <main className="main">
      {connectionStatus === "connected" && (
        <MintScreen setAppChainId={props.setAppChainId} />
      )}

      {connectionStatus === "disconnected" && (
        <div>
          <ConnectWallet />
        </div>
      )}
    </main>
  );
}

const mumbaiContract = "0x88f54479F9DB46c2d97823D01CC316aa88B54a33";
const goerliContract = "0x242674c150A59B9297c725be75732B29dEA25a2f";

function MintScreen(props: { setAppChainId: (chainId: AppChainId) => void }) {
  const chainId = useChainId();
  const switchChain = useSwitchChain();

  if (chainId === Mumbai.chainId) {
    return (
      <Web3Button
        contractAddress={mumbaiContract}
        action={async (contract) => {
          console.log("minting");
          try {
            await contract.erc1155.claim(0, 1);
            alert("Minted successfully");
          } catch (e) {
            alert("mint failed");
            console.error(e);
          }
        }}
      >
        Mint on Mumbai
      </Web3Button>
    );
  }

  if (chainId === Goerli.chainId) {
    return (
      <Web3Button
        contractAddress={goerliContract}
        action={async (contract) => {
          console.log("minting");
          try {
            await contract.erc1155.claim(0, 1);
            alert("Minted successfully");
          } catch (e) {
            alert("mint failed");
            console.error(e);
          }
        }}
      >
        Mint on Goerli
      </Web3Button>
    );
  }

  return (
    <div>
      Not connected one of supported chains. Please switch below supported
      chains:
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => {
            props.setAppChainId(Mumbai.chainId);
            switchChain(Mumbai.chainId);
          }}
        >
          Switch to Mumbai
        </button>
        <button
          onClick={() => {
            props.setAppChainId(Goerli.chainId);
            switchChain(Goerli.chainId);
          }}
        >
          Switch to Goerli
        </button>
      </div>
    </div>
  );
}
