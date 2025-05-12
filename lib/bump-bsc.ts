
import { ethers } from 'ethers';

export async function bumpBSC(providerUrl: string) {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const signer = provider.getSigner();

  const tx = {
    to: await signer.getAddress(),
    value: ethers.parseEther('0.00001') // Updated for ethers v6
  };

  const txResp = await signer.sendTransaction(tx);
  return txResp.hash;
}
