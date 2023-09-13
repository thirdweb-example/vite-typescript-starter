import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  return (
    <main className="main">
      <div className="connect">
        <p> wide modal </p>
        <ConnectWallet
          modalSize="wide"
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />

        {spacer}

        <p> compact modal </p>
        <ConnectWallet
          modalSize="compact"
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />

        {spacer}

        <p> custom theme </p>
        <ConnectWallet
          modalSize="wide"
          theme={darkTheme({
            colors: {
              dropdownBg: "black",
              modalBg: "black",
              walletSelectorButtonHoverBg: "#111",
              accentText: "#8a63d2",
              accentButtonBg: "#7928ca",
              accentButtonText: "white",
              danger: "red",
              connectedButtonBg: "black",
              connectedButtonBgHover: "#111",
            },
          })}
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />

        {spacer}

        <p> custom welcome screen </p>
        <ConnectWallet
          modalSize="wide"
          theme={darkTheme({
            colors: {
              dropdownBg: "black",
              modalBg: "black",
              walletSelectorButtonHoverBg: "#111",
              accentText: "red",
              accentButtonBg: "#e60000",
              accentButtonText: "white",
              danger: "red",
              connectedButtonBg: "black",
              connectedButtonBgHover: "#111",
            },
          })}
          welcomeScreen={() => {
            return (
              <div
                style={{
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundImage: `url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/11924d162633027.63d907d8427ab.jpg")`,
                }}
              ></div>
            );
          }}
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        />
      </div>
    </main>
  );
}

const spacer = (
  <div
    style={{
      height: "40px",
    }}
  />
);
