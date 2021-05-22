import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import { ethers } from 'ethers';

export function getErrorMessage(error: Error): string {
  /* eslint-disable no-else-return */
  /* eslint-disable operator-linebreak */
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  }
  return 'An unknown error occurred. Check the console for more details.';
}

export function ensureNetwork(provider: ethers.providers.Web3Provider): any {
  /* eslint-disable no-underscore-dangle */
  // BSC Chain ID = 56 - TODO: add list of whitelisted chain ids
  if (provider._network?.chainId !== 56) {
    return [false, "You're connected to an unsupported network."];
  } else {
    return [true, ''];
  }
}
