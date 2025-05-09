import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const handleBump = async () => {
    setLoading(true);
    setSignature(null);
    try {
      const response = await fetch('/api/bump', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response || !response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('Response error:', errorText);
        alert('❌ Bump failed. See console for details.');
        return;
      }

      let data: any = null;
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.error('JSON parse error:', jsonErr);
        alert('❌ Bump failed. Invalid JSON response.');
        return;
      }

      if (!data || typeof data !== 'object' || !data.signature) {
        console.error('Unexpected response structure:', data);
        alert('❌ Bump failed. Response missing signature.');
        return;
      }

      setSignature(data.signature);
      alert(`✅ Bump successful! Signature: ${data.signature}`);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('❌ Network or unexpected error. Check console.');
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
        <div className="space-x-4 mb-4">
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
        {signature && (
          <p className="text-green-400">✅ Transaction Signature: <span className="break-all">{signature}</span></p>
        )}
      </main>
    </>
  )
}
