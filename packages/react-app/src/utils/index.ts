import { ethers } from 'ethers';

export const shortenAddress = (address: string): string => `${address.slice(0, 5)}..${address.slice(-5)}`;

export function formatAmount(balance: ethers.BigNumberish): string {
  const formattedBalance = ethers.utils.formatEther(balance);
  const fixedTS = Number(formattedBalance).toFixed(5);

  return ethers.utils.commify(fixedTS);
}
