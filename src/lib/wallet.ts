export async function connectWallet(): Promise<string | null> {
  const provider = window.solana;
  if (!provider || !provider.isPhantom) {
    alert("Phantom wallet not found");
    return null;
  }

  try {
    const res = await provider.connect();
    return res.publicKey.toString();
  } catch (err) {
    console.error("Wallet connection error:", err);
    return null;
  }
}