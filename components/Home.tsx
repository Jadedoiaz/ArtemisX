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
        const errorData = await response?.json().catch(() => ({ error: 'Invalid response format' }));
        console.error(errorData?.error || 'Unknown error');
        alert('❌ Bump failed. See console for details.');
        return;
      }

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        alert('❌ Bump failed. Invalid JSON response.');
        return;
      }

      if (!data || typeof data !== 'object' || !('signature' in data)) {
        console.error('Invalid or missing data from API:', data);
        alert('❌ Bump failed. Invalid response structure.');
        return;
      }

      setSignature(data.signature);
      alert(`✅ Bump successful! Signature: ${data.signature}`);
    } catch (err) {
      console.error('Network or other error:', err);
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
