import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import "./styles/Home.css";

import { Binance } from "@thirdweb-dev/chains";
import {
  useContract,
  useContractWrite,
  useSwitchChain,
  useChainId,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

export function BNBContractTest() {
  const {
    contract,
    isLoading: contractIsLoading,
    isError,
  } = useContract("0xAa889fc852d065c37d762Dbc7295c7C9A3309B30");
  const { mutateAsync: buyTokens, isLoading } = useContractWrite(
    contract,
    "buyTokens"
  );

  const activeChainId = useChainId();
  const switchChain = useSwitchChain();

  if (activeChainId !== Binance.chainId) {
    return (
      <div>
        connect to binance
        <button onClick={() => switchChain(Binance.chainId)}> switch </button>
      </div>
    );
  }

  let bnbAmount = "0.005";

  const call = async () => {
    try {
      const data = await buyTokens({
        overrides: { value: ethers.utils.parseEther(bnbAmount) },
      });
      console.log(data);
      alert(data);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div>
      {contractIsLoading ? "contract loading..." : null}
      {isError ? "contract failed to load" : null}
      <button onClick={call}> call </button>
    </div>
  );
}

export default function Home() {
  const address = useAddress();
  return (
    <main className="main">
      <div className="container">
        <div className="header">
          <div className="connect">
            <ConnectWallet />
          </div>
        </div>

        {address && <BNBContractTest />}
      </div>
    </main>
  );
}
