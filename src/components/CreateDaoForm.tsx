"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { saveDaoGroup } from "@/lib/daoStore";

export default function CreateDaoForm({ creator }: { creator: string }) {
  const [name, setName] = useState("");
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const router = useRouter();

  const handleSubmit = () => {
    if (!name || goalAmount <= 0) return alert("Please fill in all fields correctly");

    const newDao = {
      id: uuidv4(),
      name,
      creator,
      goalAmount,
      currentAmount: 0,
      members: [],
    };

    saveDaoGroup(newDao);
    router.push(`/dao/${newDao.id}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Film Crew DAO"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Funding Goal (in SOL)</label>
        <input
          type="number"
          className="border border-gray-300 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. 100"
          value={goalAmount}
          onChange={(e) => setGoalAmount(Number(e.target.value))}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        Create DAO Group
      </button>
    </form>
  );
}