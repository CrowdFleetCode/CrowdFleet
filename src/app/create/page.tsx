"use client";

import WalletButton from "@/components/WalletButton";
import CreateDaoForm from "@/components/CreateDaoForm";
import { useState } from "react";

export default function CreatePage() {
  const [wallet, setWallet] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 py-12 px-6 sm:px-12 lg:px-24 flex justify-center items-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 border border-yellow-400">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-4 text-center">
          Start a New Equipment DAO
        </h1>
        <p className="text-indigo-700 text-center mb-8">
          Create a DAO group to co-own professional equipment with your community. Set a funding goal and let others join.
        </p>

        <div className="space-y-6 flex flex-col items-center">
          <WalletButton onConnect={setWallet} />

          {wallet ? (
            <CreateDaoForm creator={wallet} />
          ) : (
            <p className="text-center text-indigo-500 mt-2">
              Connect your wallet to create a DAO
            </p>
          )}
        </div>
      </div>
    </div>
  );
}