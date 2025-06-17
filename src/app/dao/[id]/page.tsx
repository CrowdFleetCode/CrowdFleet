"use client";

import { useParams } from "next/navigation";
import { getDaoGroupById, saveDaoGroup } from "@/lib/daoStore";
import { useEffect, useState } from "react";
import { generateNftImage } from "@/lib/generateNFTImage";
import { Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export default function DaoDetailPage() {
  const { id } = useParams();
  const [dao, setDao] = useState<any>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [contribution, setContribution] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>();
  const connection = new Connection("https://api.devnet.solana.com");
  const DAO_WALLET_ADDRESS = dao?.walletAddress || "3xnesTUnhaS1L1xnaX3y5Ja6aSWXB6xbQMx7CyRf2wNT";

  useEffect(() => {
    const found = getDaoGroupById(id as string);
    setDao(found);
  }, [id]);

  if (!dao)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <p className="text-gray-600 text-lg">DAO group not found.</p>
      </div>
    );

  const handleContribute = async () => {
    if (!wallet || contribution <= 0) {
      alert("Connect wallet and enter a valid amount");
      return;
    }

    try {
      if (!window.solana || !window.solana.isPhantom) {
        alert("Phantom wallet not found");
        return;
      }

      const provider = window.solana;
      await provider.connect();

      const fromPubkey = new PublicKey(wallet);
      const toPubkey = new PublicKey(DAO_WALLET_ADDRESS);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: contribution * 1e9, 
        })
      );

      transaction.feePayer = fromPubkey;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signed = await provider.signTransaction(transaction);

      const signature = await connection.sendRawTransaction(signed.serialize());

      await connection.confirmTransaction(signature);

      alert(`Transaction confirmed! Signature: ${signature}`);

      const updated = { ...dao };
      updated.currentAmount += contribution;
      updated.members.push({ address: wallet, amount: contribution });
      saveDaoGroup(updated);
      setDao(updated);

      const dataUrl = generateNftImage({
        name: dao.name,
        member: wallet,
        count: contribution,
      });
      setImgSrc(dataUrl);
    } catch (error: any) {
      alert(`Transaction failed: ${error.message || error}`);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 py-12 px-6 sm:px-12 lg:px-24 flex justify-center items-center">
      <div className="max-w-3xl bg-white mx-auto space-y-8 w-500 rounded-3xl shadow-2xl p-10 border border-yellow-400 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">{dao.name}</h1>

        <div className="text-left space-y-3 text-gray-700 text-lg">
          <p>
            Funding goal:{" "}
            <span className="font-semibold text-indigo-600">{dao.goalAmount} SOL</span>
          </p>
          <p>
            Raised so far:{" "}
            <span className="font-semibold text-indigo-600">{dao.currentAmount} SOL</span>
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner border border-gray-300">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.min((dao.currentAmount / dao.goalAmount) * 100, 100)}%`,
              }}
            />
          </div>

          <p className="text-sm text-gray-600">
            {Math.min(Number(((dao.currentAmount / dao.goalAmount) * 100).toFixed(1)), 100)}% funded
          </p>
        </div>

        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contribute</h2>

          {!wallet ? (
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
              onClick={() => {
                if ("solana" in window) {
                  (window as any).solana.connect().then((res: any) => {
                    setWallet(res.publicKey.toString());
                  });
                } else {
                  alert("Phantom wallet not found");
                }
              }}
            >
              Connect Wallet
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 break-all">
                Connected wallet: <span className="font-mono">{wallet}</span>
              </p>
              <input
                type="number"
                min={0}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter amount in SOL"
                value={contribution}
                onChange={(e) => setContribution(Number(e.target.value))}
              />
              <button
                onClick={handleContribute}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Contribute & Mint NFT
              </button>
            </div>
          )}
        </section>

        {imgSrc && (
          <div className="flex justify-center">
            <img
              src={imgSrc}
              alt="NFT Preview"
              className="rounded-2xl max-w-full shadow-lg border border-gray-200"
            />
          </div>
        )}

        <section className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Members</h3>
          {dao.members.length === 0 ? (
            <p className="text-gray-500">No contributors yet.</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {dao.members.map((m: any, idx: number) => (
                <li
                  key={idx}
                  className="text-gray-700 text-sm font-mono bg-gray-50 p-2 rounded-lg border border-gray-200"
                >
                  {m.address} — <span className="font-semibold">{m.amount} SOL</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}