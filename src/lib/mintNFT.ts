import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import {
  Metaplex,
  keypairIdentity,
  irysStorage,
} from "@metaplex-foundation/js";

export async function mintDaoNft({
  name,
  description,
  imageUri,
  memberAddress,
  contribution,
}: {
  name: string;
  description: string;
  imageUri: string;
  memberAddress: string;
  contribution: number;
}): Promise<string> {
  const connection = new Connection(clusterApiUrl("devnet"));
  const wallet = window.solana;

  if (!wallet || !wallet.publicKey) throw new Error("Wallet not connected");

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(Keypair.generate()))
    .use(irysStorage());

  const metadata = {
    name,
    symbol: "DAO",
    description,
    image: imageUri,
    attributes: [
      { trait_type: "Member", value: memberAddress },
      { trait_type: "Contribution", value: `${contribution} SOL` },
    ],
  };

  const { uri } = await metaplex.nfts().uploadMetadata(metadata);
  const { nft } = await metaplex.nfts().create({
    uri,
    name,
    sellerFeeBasisPoints: 0,
    symbol: "DAO",
    creators: [
      {
        address: new PublicKey(memberAddress),
        verified: true,
        share: 100,
      },
    ],
  });

  return nft.address.toString();
}