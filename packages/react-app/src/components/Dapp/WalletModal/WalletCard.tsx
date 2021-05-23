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
    <div>
      <div className="flex w-auto justify-center">
        <Icon
          className="cursor-pointer transform hover:-translate-y-1 hover:scale-110"
          width="48px"
          onClick={() => {
            login(walletConfig.connectorId);
            activate(walletConfig.connectorId);
            onClose();
          }}
        />
      </div>
      <div className="flex mt-4">
        <p className=" justify-center text-center">{title}</p>
      </div>
    </div>
  );
};

export default WalletCard;
