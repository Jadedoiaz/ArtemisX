import { NextApiRequest, NextApiResponse } from 'next'
import { Connection, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const heliusUrl = process.env.HELIUS_RPC_URL;
    if (!heliusUrl) {
      throw new Error('HELIUS_RPC_URL environment variable is not set.');
    }

    const connection = new Connection(heliusUrl, 'confirmed');

    // Simulate a signer wallet (in real use, replace with proper signer logic or restrict actions)
    const dummyKeypair = Keypair.generate();

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: dummyKeypair.publicKey,
        toPubkey: dummyKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL / 1_000_000, // 0.000001 SOL
      })
    );

    tx.feePayer = dummyKeypair.publicKey;
    const { blockhash } = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash;

    // Sign transaction
    tx.sign(dummyKeypair);

    const rawTx = tx.serialize();
    const txid = await connection.sendRawTransaction(rawTx);

    res.status(200).json({ success: true, txid });
  } catch (error: any) {
    console.error('❌ Server error:', error);
    res.status(500).json({ success: false, error: error.message || 'Unknown error' });
  }
}
