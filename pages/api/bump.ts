import { NextApiRequest, NextApiResponse } from 'next'
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} from '@solana/web3.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiKey = process.env.HELIUS_API_KEY
    if (!apiKey) throw new Error('Missing HELIUS_API_KEY env variable')

    const connection = new Connection('https://mainnet.helius-rpc.com', {
      commitment: 'confirmed',
      httpHeaders: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    const dummyKeypair = Keypair.generate()
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: dummyKeypair.publicKey,
        toPubkey: dummyKeypair.publicKey,
        lamports: LAMPORTS_PER_SOL / 1_000_000,
      })
    )

    tx.feePayer = dummyKeypair.publicKey
    const { blockhash } = await connection.getLatestBlockhash()
    tx.recentBlockhash = blockhash
    tx.sign(dummyKeypair)

    const rawTx = tx.serialize()
    const txid = await connection.sendRawTransaction(rawTx)

    res.status(200).json({ success: true, txid })
  } catch (error: any) {
    console.error('❌ Server error:', error)
    res.status(500).json({ success: false, error: error.message || 'Unknown error' })
  }
}
