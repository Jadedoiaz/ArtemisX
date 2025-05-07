import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SolanaWalletWrapper } from '@/components/SolanaWalletWrapper'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaWalletWrapper>
      <Component {...pageProps} />
    </SolanaWalletWrapper>
  )
}
