"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 text-white">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Welcome to <span className="text-yellow-300">CrowdFleet DAO</span>
        </h1>
        <p className="text-lg sm:text-xl text-indigo-200">
          Create and manage equipment ownership DAOs effortlessly. Unite your community,
          pool funds, and co-own professional gear like never before.
        </p>
        <button
          onClick={() => router.push("/create")}
          className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-4 px-12 rounded-3xl shadow-lg transition duration-300 ease-in-out drop-shadow-md"
          aria-label="Go to create DAO page"
        >
          Start Your DAO Now
        </button>
      </div>
    </div>
  );
}