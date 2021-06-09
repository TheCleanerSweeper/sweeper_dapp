import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { BscConnector } from '@binance-chain/bsc-connector';

const RPC: { [chainId: number]: string } = {
  56: 'https://bsc-dataseed.binance.org/',
};

export const injected = new InjectedConnector({ supportedChainIds: [56] });

export const network = new NetworkConnector({
  urls: { 56: RPC[56] },
  defaultChainId: 56,
});

export const bscConnector = new BscConnector({ supportedChainIds: [56] });

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 56: RPC[56] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});
