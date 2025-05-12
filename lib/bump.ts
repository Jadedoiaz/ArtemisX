import { ethers } from 'ethers'

export async function sendMockBscBump(signer: ethers.Signer) {
  if (!signer) throw new Error('No signer available')

  const tx = {
    to: await signer.getAddress(),
    value: ethers.utils.parseEther('0.00001'), // self-send
  }

  const txResp = await signer.sendTransaction(tx)
  return txResp.hash
}
