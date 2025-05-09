import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleBump = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bump', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Invalid response format' }));
        console.error(errorData.error);
        alert('❌ Bump failed. See console for details.');
        return;
      }

      const data = await response.json().catch(() => null);
      if (!data || !data.signature) {
        console.error('Invalid or missing data from API');
        alert('❌ Bump failed. Invalid response.');
        return;
      }

      alert(`✅ Bump successful! Signature: ${data.signature}`);
    } catch (err) {
      console.error(err);
      alert('❌ Network error. See console for details.');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Connect Wallet
          </button>
          <button
            onClick={handleBump}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Bumping...' : 'Start Bumping'}
          </button>
        </div>
      </main>
    </>
  )
}
