"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDaoGroups } from "@/lib/daoStore";

export default function AllDaosPage() {
  const [daos, setDaos] = useState<any[]>([]);

  useEffect(() => {
    const all = getDaoGroups();
    setDaos(all);
  }, []);

  if (daos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <p className="text-gray-600 text-lg">No DAOs found yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-12 text-center">
          Explore Equipment DAOs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {daos.map((dao, idx) => {
            const percent = Math.min((dao.currentAmount / dao.goalAmount) * 100, 100);

            return (
              <>
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all cursor-pointer">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{dao.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {dao.currentAmount} / {dao.goalAmount} SOL raised
                  </p>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {Number(percent.toFixed(1))}% funded
                  </p>

                  {percent === 100 && (
                    <div className="mt-3 inline-block text-sm text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full">
                      ✅ Fully Funded
                    </div>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
