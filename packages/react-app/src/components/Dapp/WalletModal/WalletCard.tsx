import React from 'react';
import { Config } from './config';

interface Props {
  walletConfig: Config;
  login: any; // eslint-disable-line
  onClose: () => void;
  activate: any; // eslint-disable-line
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onClose, activate }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <button
      type="button"
      className="flex w-full m-2 p-2 border-2 rounded-2xl border-gray-300"
      onClick={() => {
        login(walletConfig.connectorId);
        activate(walletConfig.connectorId);
        onClose();
      }}
    >
      <div className="flex w-auto justify-center">
        <Icon className="cursor-pointer transform hover:-translate-y-1 hover:scale-110" width="48px" />
      </div>
      <div className="m-auto">
        <p className="text-center">{title}</p>
      </div>
    </button>
  );
};

export default WalletCard;
