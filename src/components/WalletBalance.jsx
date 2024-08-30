import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const WalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) {
        setBalance(null);
        return;
      }

      try {
        const walletBalance = await connection.getBalance(publicKey);
        setBalance(walletBalance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(null);
      }
    };

    fetchBalance();
    // Set up an interval to fetch the balance every 10 seconds
    const intervalId = setInterval(fetchBalance, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [connection, publicKey]);

  if (balance === null) {
    return <div className="wallet-balance">Wallet not connected</div>;
  }

  return (
    <div className="wallet-balance">Balance: {balance.toFixed(4)} SOL</div>
  );
};

export default WalletBalance;
