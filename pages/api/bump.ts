
import { NextApiRequest, NextApiResponse } from 'next'
import { Connection, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, clusterApiUrl } from '@solana/web3.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed')

    // Simulate a signer wallet (in real use, replace with proper signer logic or restrict actions)
    const dummyKeypair = Keypair.generate()

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: dummyKeypair.publicKey,
        toPubkey: dummyKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL / 1_000_000, // 0.000001 SOL
      })
    )

    tx.feePayer = dummyKeypair.publicKey
    const { blockhash } = await connection.getLatestBlockhash()
    tx.recentBlockhash = blockhash

    // Sign transaction
    tx.sign(dummyKeypair)

    const rawTx = tx.serialize()
    const txid = await connection.sendRawTransaction(rawTx)

    res.status(200).json({ success: true, txid })
  } catch (error: any) {
    console.error('❌ Server error:', error)
    res.status(500).json({ success: false, error: error.message || 'Unknown error' })
  }
}
