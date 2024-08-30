import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import AirDrop from "./components/AirDrop";

import "./App.css";
import WalletBalance from "./components/WalletBalance";

function App() {
  const network = WalletAdapterNetwork.Devnet;

  // Use custom RPC endpoint
  const endpoint = useMemo(
    () =>
      "https://solana-devnet.g.alchemy.com/v2/yU6R0UHZibbX7Q92cpYxmg5dwOe9IcHG",
    []
  );

  // Fallback to clusterApiUrl if custom endpoint fails
  const fallbackEndpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <>
      <ConnectionProvider endpoint={endpoint || fallbackEndpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="app-container">
              <nav className="navbar">
                <div className="navbar-brand">Solana Airdrop App</div>
                <div className="navbar-wallet-buttons">
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
              </nav>
              <main className="main-content">
                <h1>Welcome to MC Solana Airdrop</h1>
                <WalletBalance />
                <AirDrop />
              </main>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
