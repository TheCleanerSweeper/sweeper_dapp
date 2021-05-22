import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ChartBarIcon, CurrencyYenIcon, FireIcon } from '@heroicons/react/outline';
import CountUp from 'react-countup';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { formatAmount } from '../../utils/index';

const getData = async (sweeperContract, provider, setsupplyInfo, setburnInfo): Promise<void> => {
  if (!provider) {
    setburnInfo(0);
    setsupplyInfo('0');
    return;
  }
  const totalSupply = await sweeperContract.totalSupply();
  const formattedSupply = formatAmount(totalSupply);

  setsupplyInfo(formattedSupply);

  const lastTransfer = await sweeperContract.lastTransfer();
  const adjuster = await sweeperContract.ADJUSTER();
  const latestHeight = await provider.getBlockNumber();
  const latestBlock = await provider.getBlock(latestHeight);
  const timeDifference = ethers.BigNumber.from(latestBlock.timestamp).sub(lastTransfer);
  const difference = ethers.BigNumber.from(timeDifference).div(ethers.BigNumber.from(adjuster));

  const lowerFee = await sweeperContract.LOWER_FEE();
  const upperFee = await sweeperContract.UPPER_FEE();

  const fee = lowerFee.add(difference);
  if (fee.toNumber() > upperFee.toNumber()) {
    setburnInfo(upperFee.toNumber());
  } else {
    setburnInfo(fee.toNumber() - 100);
  }
};

interface DashBoardProps {
  sweeperContract: ethers.Contract;
}

const Dashboard: React.FC<DashBoardProps> = ({ sweeperContract }: DashBoardProps) => {
  const [supplyInfo, setsupplyInfo] = useState('');
  const [burnInfo, setburnInfo] = useState();

  const { library, active, error } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (sweeperContract && !error) {
      getData(sweeperContract, library, setsupplyInfo, setburnInfo);
    }
  }, [sweeperContract, library, active]);

  return (
    <>
      <div
        className="mt-10 overflow-hidden shadow rounded-lg divide-y divide-gray-200
      justify-center text-center text-3xl"
      >
        <div
          className="px-4 py-3 sm:px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800
        text-white flex justify-center"
        >
          <ChartBarIcon className="w-8 mr-4 text-indigo-400" />
          Dashboard
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {sweeperContract ? (
          <>
            <div
              className="flex-auto h-36 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center
            text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
            >
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Total Supply:
              </div>
              <div className="text-white mt-4">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," duration={1} end={supplyInfo ? parseFloat(supplyInfo.replace(/,/g, '')) : 0} />
                </span>
                <span className="text-indigo-400"> $SWEEP</span>
              </div>
            </div>
            <div
              className="flex-auto h-36 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center
               text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 "
            >
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <FireIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Burn Rate:
              </div>
              <div className=" mt-4">
                <span className={Number(burnInfo) < 0 ? 'text-red-500' : 'text-green-500'}>
                  {burnInfo ? `${burnInfo}%` : '%'}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
