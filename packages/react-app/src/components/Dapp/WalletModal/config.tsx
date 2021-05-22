import { FC } from 'react';

import Metamask from './icons/Metamask';
import TrustWallet from './icons/TrustWallet';
import WalletConnectIcon from './icons/WalletConnect';
// import BinanceChain from './icons/BinanceChain';
import { injected, network, walletconnect } from '../../../connectors';

export interface Config {
  title: string;
  icon: FC<any>;
  connectorId: any;
}
// todo: add bsc wallet
enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  WalletConnect = 'WalletConnect',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  [ConnectorNames.WalletConnect]: walletconnect,
};

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: connectorsByName[ConnectorNames.Injected],
  },
  {
    title: 'TrustWallet',
    icon: TrustWallet,
    connectorId: connectorsByName[ConnectorNames.Injected],
  },
  {
    title: 'WalletConnect',
    icon: WalletConnectIcon,
    connectorId: connectorsByName[ConnectorNames.WalletConnect],
  },
  // {
  //   title: 'Binance Chain Wallet',
  //   icon: BinanceChain,
  //   connectorId: ConnectorNames.BSC,
  // },
];

export default connectors;
export const connectorLocalStorageKey = 'connectorId';
