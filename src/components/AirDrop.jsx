import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const AirDrop = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAirdrop = async () => {
    setStatus("");
    setIsLoading(true);
    try {
      let pubKey = publicKey;
      if (address) {
        pubKey = new PublicKey(address);
      } else if (!publicKey) {
        throw new Error("Please connect your wallet or enter an address.");
      }

      // eslint-disable-next-line no-unused-vars
      const signature = await connection.requestAirdrop(
        pubKey,
        amount * LAMPORTS_PER_SOL
      );

      // await connection.confirmTransaction({
      //   signature: signature,
      // });

      setStatus(`Success! Airdropped ${amount} SOL to ${pubKey.toBase58()}`);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="airdrop-container">
      <h2>Solana Airdrop</h2>
      <input
        type="text"
        placeholder="Solana address (optional)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={isLoading}
      />
      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        min="0.1"
        step="0.1"
        disabled={isLoading}
      />
      <button onClick={handleAirdrop} disabled={isLoading}>
        {isLoading ? "Processing..." : "Request Airdrop"}
      </button>
      {isLoading && (
        <div className="loading">Processing airdrop request...</div>
      )}
      {status && (
        <div
          className={`status ${status.includes("Error") ? "error" : "success"}`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default AirDrop;
