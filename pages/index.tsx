import Head from 'next/head'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
)

export default function Home() {
  const { connected, publicKey } = useWallet()
  const [status, setStatus] = useState('')

  const handleBump = () => {
    if (!connected || !publicKey) {
      setStatus('Wallet not connected!')
      return
    }

    console.log('Sending bump transaction...')
    setStatus('✅ Bump triggered at ' + new Date().toLocaleTimeString())
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
