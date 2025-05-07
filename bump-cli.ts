#!/usr/bin/env ts-node
import { Connection, Keypair, Transaction } from '@solana/web3.js'
import { ethers } from 'ethers'

async function bumpSolana() {
  const connection = new Connection('https://api.mainnet-beta.solana.com')
  const kp = Keypair.generate()
  const tx = new Transaction()
  tx.feePayer = kp.publicKey
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  console.log('Solana Bump Simulated from', kp.publicKey.toBase58())
}

async function bumpBsc() {
  const wallet = ethers.Wallet.createRandom()
  console.log('BSC Bump Simulated from', wallet.address)
}

const chain = process.argv[2]
if (chain === 'sol') bumpSolana()
else if (chain === 'bsc') bumpBsc()
else console.log('Usage: bump-cli.ts [sol|bsc]')
