import { NextApiRequest, NextApiResponse } from 'next'
import { Connection, Transaction } from '@solana/web3.js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiKey = process.env.HELIUS_API_KEY
    if (!apiKey || typeof apiKey !== 'string') {
      throw new Error('Missing or invalid HELIUS_API_KEY env variable')
    }

    const connection = new Connection(
      `https://mainnet.helius-rpc.com/?api-key=${apiKey}`,
      'confirmed'
    )

    const { signedTx } = req.body
    if (!signedTx || typeof signedTx !== 'string') {
      return res.status(400).json({ success: false, error: 'Missing or invalid signed transaction' })
    }

    const rawTx = Buffer.from(signedTx, 'base64')
    const txid = await connection.sendRawTransaction(rawTx)

    res.status(200).json({ success: true, txid })
  } catch (error: any) {
    console.error('❌ Server error:', error)
    res.status(500).json({ success: false, error: error.message || 'Unknown error' })
  }
}
