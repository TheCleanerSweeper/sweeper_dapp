import React from 'react';
import { connectorLocalStorageKey } from './config';
import { Config } from './types';

interface Props {
  walletConfig: Config;
  login: () => void;
  onDismiss: () => void;
  activate: () => void;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, activate }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <button
      type="button"
      className="w-full"
      onClick={() => {
        login(walletConfig.connectorId);
        onDismiss();
      }}
      style={{ justifyContent: 'space-between' }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <p bold color="primary" mr="16px">
        {title}
      </p>
      <Icon width="32px" />
    </button>
  );
};

export default WalletCard;
