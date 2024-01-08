import { ConnectWallet, useSigner } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { useState } from "react";

export default function Home() {
  const signer = useSigner();
  const [signatureStatus, setSignatureStatus] = useState<"signing" | "idle">(
    "idle"
  );

  return (
    <main className="main">
      <div className="container">
        <div
          style={{
            padding: "20px",
          }}
        >
          <ConnectWallet
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
          />

          {signer && (
            <div
              style={{
                marginTop: "40px",
              }}
            >
              <button
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  outline: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={async () => {
                  setSignatureStatus("signing");
                  try {
                    const signature = await signer.signMessage("Hello World!");
                    alert(`Signature: ${signature}`);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setSignatureStatus("idle");
                  }
                }}
              >
                {signatureStatus === "signing" && "Signing..."}
                {signatureStatus === "idle" && "Sign Message"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
