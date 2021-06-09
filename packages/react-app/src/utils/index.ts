import { ethers } from 'ethers';

export const shortenAddress = (address: string, num = 5): string => `${address.slice(0, num)}
..${address.slice(1 - num)}`;

export function formatAmount(balance: ethers.BigNumberish): string {
  const formattedBalance = ethers.utils.formatEther(balance);
  const fixedTS = Number(formattedBalance).toFixed(5);

  return ethers.utils.commify(fixedTS);
}
