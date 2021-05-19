import React from 'react';
import { Config } from './config';

interface Props {
  walletConfig: Config;
  login: any;
  onClose: any;
  activate: any;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onClose, activate }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <button
      type="button"
      className="w-full, justify-between"
      onClick={() => {
        login(walletConfig.connectorId);
        activate(walletConfig.connectorId);
        onClose();
      }}
    >
      <p className="text-bold">{title}</p>
      <Icon width="32px" />
    </button>
  );
};

export default WalletCard;
