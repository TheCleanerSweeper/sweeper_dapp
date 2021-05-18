import Metamask from './icons/Metamask';
import TrustWallet from './icons/TrustWallet';
import WalletConnect from './icons/WalletConnect';
import BinanceChain from './icons/BinanceChain';
import { Config, ConnectorNames } from './types';

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'TrustWallet',
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
  },
  {
    title: 'Binance Chain Wallet',
    icon: BinanceChain,
    connectorId: ConnectorNames.BSC,
  },
];

export default connectors;
export const connectorLocalStorageKey = 'connectorId';
