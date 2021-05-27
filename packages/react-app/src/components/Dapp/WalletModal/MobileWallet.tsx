import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import ConnectModal from './ConnectModal';

const MobileWallet: React.FC = () => {
  const { active } = useWeb3React<Web3Provider>();
  return (
    <>
      {!active ? (
        <div className="flex justify-center lg:hidden">
          <ConnectModal />
        </div>
      ) : null}
    </>
  );
};

export default MobileWallet;
