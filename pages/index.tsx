import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Connection, SystemProgram, Transaction } from '@solana/web3.js'

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function Home() {
  const wallet = useWallet()
  const { connected, publicKey, signTransaction } = wallet
  const [status, setStatus] = useState('')

  const handleBump = async () => {
    if (!connected || !publicKey || !signTransaction) {
      setStatus('Wallet not connected or unsupported.')
      return
    }

    try {
      const connection = new Connection('https://api.mainnet-beta.solana.com')
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 1000 // 0.000001 SOL
        })
      )

      const signedTx = await signTransaction(tx)
      const sig = await connection.sendRawTransaction(signedTx.serialize())
      await connection.confirmTransaction(sig, 'confirmed')
      setStatus(`✅ Bump TX confirmed: ${sig.slice(0, 8)}...`)
    } catch (err) {
      console.error(err)
      setStatus('❌ Bump failed. See console.')
    }
  }

  return (
    <>
      <Head>
        <title>ArtemisX</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-4">🚀 ArtemisX</h1>
        <p className="mb-6 text-center max-w-xl">
          GPT-aligned, override-enabled, chain-agnostic bump automation.
        </p>
        <WalletMultiButton />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleBump}
        >
          Start Bumping
        </button>
        {status && <p className="mt-6 text-lg text-yellow-300">{status}</p>}
      </main>
    </>
  )
}
