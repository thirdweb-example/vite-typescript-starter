import { ConnectWallet, Web3Button, darkTheme } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Base } from "@thirdweb-dev/chains";

export default function Home() {
  return (
    <main className="main">
      <div className="connect">
        {/* <p> wide modal </p> */}
        <ConnectWallet
          modalSize="compact"
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
          supportedTokens={{
            [Base.chainId]: [
              {
                address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
                name: "Dai Stablecoin",
                symbol: "DAI",
                icon: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508",
              },
              // ...etc
            ],
          }}
        />

        {spacer}

        {/* <p> custom theme </p>
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
        /> */}

        {/* <p> compact modal </p>
        <ConnectWallet
          modalSize="compact"
          dropdownPosition={{
            side: "bottom",
            align: "center",
          }}
        /> */}

        {/*

        {spacer}


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

        {spacer}
        <p> web3button with custom ConnectWallet </p>
        <Web3Button
          theme={darkTheme({
            colors: {
              primaryButtonBg: "orange",
              primaryButtonText: "black",
              primaryText: "white",
              modalBg: "black",
              accentText: "orange",
              accentButtonBg: "red",
            },
          })}
          action={async (contract) => {
            await contract.erc1155.claim(0, 1);
          }}
          connectWallet={{
            modalSize: "compact",
            modalTitle: "Login",
            btnTitle: "Claim NFT",
          }}
          contractAddress="0x88f54479F9DB46c2d97823D01CC316aa88B54a33"
          onError={(e) => {
            alert(e.message);
          }}
          onSuccess={() => {
            alert("Success");
          }}
        >
          Claim NFT
        </Web3Button> */}
        {/* <EmbededSmartWalletTest /> */}
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

import {
  embeddedWallet,
  metamaskWallet,
  smartWallet,
  useConnect,
  useSmartWallet,
} from "@thirdweb-dev/react";

const embededWalletConfig = embeddedWallet();

export function EmbededSmartWalletTest() {
  const connectSmartWallet = useSmartWallet();
  const connect = useConnect();

  return (
    <div>
      <button
        className="btn"
        onClick={async () => {
          console.log("connectting...");
          try {
            const wallet = await connect(embededWalletConfig, {
              chainId: 80001,
              email: "manan@thirdweb.com",
              loginType: "ui_email_otp",
            });

            console.log("wallet connected", wallet);

            await connectSmartWallet(embededWalletConfig, {
              factoryAddress: "0x219312a1c180B82abEE14FbDB4C9EE04E90c1809",
              gasless: true,
              personalWallet: wallet,
            });
          } catch (e) {
            console.log("failed to connect", e);
          }
        }}
      >
        {" "}
        Embeded + Smart Test with hooks{" "}
      </button>
    </div>
  );
}
