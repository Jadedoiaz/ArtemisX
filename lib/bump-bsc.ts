import { ethers } from 'ethers';

export async function bumpBSC(providerUrl: string) {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const signer = await provider.getSigner(); // 👈 must await this

  const address = await signer.getAddress();

  const tx = {
    to: address,
    value: ethers.parseEther('0.00001') // ✅ ethers v6 syntax
  };

  const txResp = await signer.sendTransaction(tx);
  return txResp.hash;
}

