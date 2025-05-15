import { useState } from "react";
import { connectWallet } from "@/lib/wallet";

export default function WalletButton({ onConnect }: { onConnect: (address: string) => void }) {
  const [wallet, setWallet] = useState<string | null>(null);

  const handleClick = async () => {
    const address = await connectWallet();
    if (address) {
      setWallet(address);
      onConnect(address);
    }
  };

  return (
    <button onClick={handleClick} className="px-4 py-2 bg-black text-white rounded-xl">
      {wallet ? `Connected: ${wallet.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  );
}