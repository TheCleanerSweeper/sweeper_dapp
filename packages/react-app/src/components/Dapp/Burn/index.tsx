import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import BurnCard from './BurnCard';

const Burn: React.FC = () => {
  const { library, account, active } = useWeb3React<Web3Provider>();
  return (
    <>
      <div
        className="mt-5 overflow-hidden shadow rounded-lg justify-center text-center
   text-3xl bg-gradient-to-br  from-gray-700 via-gray-800 to-gray-700"
      >
        <div
          className="flex justify-center text-center px-4 py-5 sm:px-6
      bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white"
        >
          Burn
        </div>
      </div>
      <BurnCard />
    </>
  );
};

export default Burn;
