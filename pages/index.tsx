import { useState } from 'react'
import { Connection, SystemProgram, Transaction } from '@solana/web3.js'
import { useWallet, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

require('@solana/wallet-adapter-react-ui/styles.css')

const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed')

function Home() {
  const wallet = useWallet()
  const [loading, setLoading] = useState(false)
  const [txid, setTxid] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleBump = async () => {
    setLoading(true)
    setTxid(null)
    setError(null)

    try {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error('Wallet not connected')
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: wallet.publicKey,
          lamports: 1000,
        })
      )

      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = wallet.publicKey

      const signed = await wallet.signTransaction(transaction)
      const rawTx = signed.serialize().toString('base64')

      const res = await fetch('/api/bump', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signedTx: rawTx }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unknown error')
      setTxid(data.txid)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6">🌑 ArtemisX</h1>
      <WalletMultiButton className="mb-4" />
      <button
        onClick={handleBump}
        disabled={loading || !wallet.connected}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Bumping...' : 'Bump TX'}
      </button>
      {txid && <p className="mt-4 text-green-400">✅ Success! TX ID: {txid}</p>}
      {error && <p className="mt-4 text-red-400">❌ Error: {error}</p>}
    </div>
  )
}

const wallets = [new PhantomWalletAdapter()]

export default function App() {
  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <Home />
      </WalletModalProvider>
    </WalletProvider>
  )
}
