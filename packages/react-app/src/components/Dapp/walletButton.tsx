import React from 'react';

interface WalletButtonProps {
  provider: any;
  loadWeb3Modal: any;
  logoutOfWeb3Modal: any;
}

const WalletButton: React.FC<WalletButtonProps> = ({ provider, loadWeb3Modal, logoutOfWeb3Modal }) => (
  <button
    type="button"
    onClick={() => {
      if (!provider) {
        loadWeb3Modal();
      } else {
        logoutOfWeb3Modal();
      }
    }}
  >
    {!provider ? 'Connect Wallet' : 'Disconnect Wallet'}
  </button>
);

export default WalletButton;
