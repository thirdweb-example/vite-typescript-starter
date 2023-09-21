import {
  ConnectWallet,
  useAddress,
  useConnect,
  useConnectionStatus,
  useWalletConnect,
} from "@thirdweb-dev/react";
import "./styles/Home.css";
import { styled, css } from "styled-components";

export default function Home() {
  const walletConnect = useWalletConnect();
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  return (
    <main className="main">
      <div className="container">
        <ConnectWallet
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />

        <div
          style={{
            height: "50px",
          }}
        ></div>

        {connectionStatus !== "connected" && (
          <Button
            onClick={async () => {
              const wallet = await walletConnect();
            }}
          >
            {connectionStatus === "connecting"
              ? "Connecting..."
              : "Connect with WC"}
          </Button>
        )}

        {connectionStatus === "connected" && <p> Connected to {address} </p>}
      </div>
    </main>
  );
}

const Button = styled.button`
  all: unset;
  cursor: pointer;

  /* This renders the buttons above... Edit me! */
  background: ${(props) => props.theme.accent};
  border-radius: 3px;
  color: white;
  display: inline-block;
  padding: 0.5rem;
  transition: all 200ms ease-in-out;

  &:hover {
    filter: brightness(0.85);
  }

  &:active {
    filter: brightness(1);
  }
`;
