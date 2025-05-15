"use client";

import WalletButton from "@/components/WalletButton";
import CreateDaoForm from "@/components/CreateDaoForm";
import { useState } from "react";

export default function CreatePage() {
  const [wallet, setWallet] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Start a New Equipment DAO</h1>
        <p className="text-gray-600 mb-8">
          Create a DAO group to co-own professional equipment with your community. Set a funding goal and let others join.
        </p>
        <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-100">
          <WalletButton onConnect={setWallet} />
          {wallet && <CreateDaoForm creator={wallet} />}
        </div>
      </div>
    </div>
  );
}