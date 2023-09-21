import { ConnectWallet, lightTheme } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="main">
      <div className="container">
        <div className="connect">
          <ConnectWallet
            // theme="light"
            modalSize="compact"
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
            theme="dark"
            // theme={lightTheme({
            //   colors: {
            //     modalOverlayBg: "rgba(255, 255, 255, 0.1)",
            //   },
            // })}
          />
        </div>
      </div>
    </main>
  );
}
