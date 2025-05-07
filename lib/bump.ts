import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, Transaction } from '@solana/web3.js'

export async function sendMockSolanaBump(connection: Connection, wallet: any) {
  if (!wallet.publicKey || !wallet.signTransaction) throw new Error('Wallet not connected')

  const tx = new Transaction()
  tx.feePayer = wallet.publicKey
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  const signed = await wallet.signTransaction(tx)
  const sig = await connection.sendRawTransaction(signed.serialize())
  return sig
}
