import React, { Fragment, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CurrencyYenIcon, FireIcon, SunIcon } from '@heroicons/react/outline';
import CountUp from 'react-countup';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from '@project/contracts';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../../../images/logo.svg';
import bnblogo from '../../../images/bnblogo.svg';
import { formatAmount, sleep } from '../../../utils/index';
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import ConnectModal from '../WalletModal/ConnectModal';

const setGeyserContractState = async (
  provider: any,
  setGeyser: React.Dispatch<React.SetStateAction<ethers.Contract>>,
): Promise<void> => {
  if (!provider) return;

  const contractAddress = addresses.geyserBSCMainnet;
  const abi = abis.geyser;
  const contract = new ethers.Contract(contractAddress, abi, provider);
  setGeyser(contract);
};

const setLPContractState = async (
  provider: any,
  setLPContract: React.Dispatch<React.SetStateAction<ethers.Contract>>,
): Promise<void> => {
  if (!provider) return;

  const contractAddress = addresses.lpSweepBSCMainnet;
  const abi = abis.lp;
  const contract = new ethers.Contract(contractAddress, abi, provider);

  setLPContract(contract);
};

const Storm: React.FC = () => {
  const { library, account, active } = useWeb3React<Web3Provider>();

  const [signer, setSigner] = useState<any>();

  // Modal for sending a "Stake" transaction
  const [showStakeModal, setShowStakeModal] = useState(false);
  // Modal for sending a "Unstake" transaction
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);

  // Staking Token address
  const [stakingTokenAddress, setStakingTokenAddress] = useState<string>();
  // Distribution Token address
  const [distributionTokenAddress, setDistributionTokenAddress] = useState<string>();

  // The Geyser end date
  const [endDate, setEndDate] = useState<Date>();

  // Geyser Contract
  const [geyser, setGeyser] = useState<ethers.Contract>();
  // Sweep-BNB LP Contract
  const [lpContract, setLPContract] = useState<ethers.Contract>();

  // The allowance for LP Tokens
  const [allowance, setAllowance] = useState<number>();

  // The balance of LP tokens for the connected address
  const [lpBalance, setlpbBalance] = useState<number>(0);
  // The amount of LP tokens staked for the connected address
  const [addrStaked, setAddrStaked] = useState<number>(0);
  // The total number of LP tokens staked by all users
  const [totalStaked, setTotalStaked] = useState<number>(0);

  // the amount of rewards to potentially get
  const [queryUnstake, setQueryUnstake] = useState<number | string>();

  // The amount of tokens locked in the geyser
  const [lockedGeyserBalance, setLockedGeyserBalance] = useState<number | string>();
  // the amount of tokens unlocked in the geyser
  const [unlockedGeyserBalance, setUnlockedGeyserBalance] = useState<number | string>();
  // total SWEEP locked in the geyser
  const [totalLocked, setTotalLocked] = useState<number | string>();
  // Timestamp the accounting info was updated
  const [accountingTimestamp, setAccountingTimestamp] = useState<number | string>();

  useEffect(() => {
    if (active) {
      setGeyserContractState(library, setGeyser);
      setLPContractState(library, setLPContract);
    }
  }, [library, active]);

  // State used to trigger refreshes / requerying
  const [lastUpdated, setLastUpdated] = useState<number>();

  // Get Accounting Data
  const getAccounting = async (): Promise<void> => {
    const updateAccounting = await geyser.callStatic.updateAccounting();

    const [lockedBalance, unlockedBalance, timestamp] = updateAccounting;

    // The total amount of BNB-SWEEP LP locked in the geyser
    const allLocked = Number(lockedBalance) + Number(unlockedBalance);

    setTotalLocked(allLocked);
    setLockedGeyserBalance(lockedBalance);
    setUnlockedGeyserBalance(unlockedBalance);
    setAccountingTimestamp(timestamp);
  };

  // The end date of the geyser
  const getSchedule = async (): Promise<void> => {
    const bonusPeriod = await geyser.bonusPeriodSec();
    const schedule = await geyser.unlockSchedules(0);
    const endSec = schedule[3];
    const end = (Number(bonusPeriod) + Number(endSec)) * 1000;

    const endTime = new Date(end);

    setEndDate(endTime);
  };

  // Query balance of LP tokens for the address
  const getLPBalance = async (addr: string): Promise<void> => {
    const balance = await lpContract.balanceOf(addr);
    const nice = formatAmount(balance);
    setlpbBalance(Number(nice));
  };

  // LP token address
  const getStakingToken = async (): Promise<void> => {
    const stakingToken = await geyser?.getStakingToken();
    if (stakingToken) {
      setStakingTokenAddress(stakingToken);
    }
  };

  // SWEEEP Address
  const getDistributionToken = async (): Promise<void> => {
    const distributionToken = await geyser?.getDistributionToken();
    if (distributionToken) {
      setDistributionTokenAddress(distributionToken);
    }
  };

  // The LP Stake amount for a given address
  const getTotalStakedFor = async (addr: string): Promise<string> => {
    const totalStakedFor = await geyser?.totalStakedFor(addr);
    setAddrStaked(totalStakedFor);
    return ethers.utils.formatEther(totalStakedFor);
  };

  // The total amount staked between all global users
  const getTotalStaked = async (): Promise<string> => {
    const totalStakedWei = await geyser.totalStaked();
    setTotalStaked(totalStakedWei);
    return ethers.utils.formatEther(totalStaked);
  };

  // The amount of SWEEP a user would get if they unstake
  const getQueryUnstake = async (amount: number): Promise<void> => {
    if (amount && Number(amount) > 0) {
      try {
        const sg = geyser.connect(signer);
        const unstakeAmount = await sg.callStatic.unstakeQuery(amount);
        setQueryUnstake(unstakeAmount);
      } catch (e) {
        console.log('Error fetching unstake query');
      }
    }
  };

  const getLPAllowance = async (addr: string): Promise<void> => {
    if (addr) {
      const allowanceAmount = await lpContract.allowance(addr, addresses.geyserBSCMainnet);
      setAllowance(allowanceAmount);
    }
  };

  const allowLP = async (): Promise<void> => {
    const s = lpContract.connect(signer);
    if (Number(allowance) === 0) {
      await s.approve(addresses.geyserBSCMainnet, ethers.constants.MaxUint256);
    }
  };

  // Unstake `amount` of tokens
  const unstake = async (amount: number): Promise<void> => {
    if (geyser && signer) {
      const s = lpContract.connect(signer);
      if (Number(allowance) === 0) {
        const approveTx = await s.approve(addresses.geyserBSCMainnet, ethers.constants.MaxUint256);
        const approveToastId = toast.loading('Waiting for transaction...', {
          duration: 50000,
        });
        library.waitForTransaction(approveTx.hash).then((receipt: ethers.providers.TransactionReceipt) => {
          toast.dismiss(approveToastId);
          toast.success('tx successful!');
          getLPAllowance(account);
        });
      } else {
        const sg = geyser.connect(signer);
        const unstakeAmount = ethers.utils.parseUnits(amount.toString(), 18);

        const tx = await sg.unstake(unstakeAmount, '0x00');
        const toastId = toast.loading('Waiting for transaction...', {
          duration: 50000,
        });
        setShowUnstakeModal(false);
        library.waitForTransaction(tx.hash).then((receipt: ethers.providers.TransactionReceipt) => {
          toast.dismiss(toastId);
          toast.success('tx successful!');
          const updated = Date.now();
          setLastUpdated(updated);
          getTotalStakedFor(account);
          setQueryUnstake(0);
        });
      }
    }
  };

  const stake = async (amount: string | number): Promise<void> => {
    if (geyser && signer) {
      const s = lpContract.connect(signer);
      if (Number(allowance) === 0) {
        const approveTx = await s.approve(addresses.geyserBSCMainnet, ethers.constants.MaxUint256);
        const approveToastId = toast.loading('Waiting for transaction...', {
          duration: 50000,
        });
        library.waitForTransaction(approveTx.hash).then((receipt: ethers.providers.TransactionReceipt) => {
          toast.dismiss(approveToastId);
          toast.success('tx successful!');
          getLPAllowance(account);
        });
      } else {
        const sg = geyser.connect(signer);
        const stakeAmount = ethers.utils.parseUnits(amount.toString(), 18);

        const tx = await sg.stake(stakeAmount, '0x00');
        const toastId = toast.loading('Waiting for transaction...', {
          duration: 50000,
        });
        setShowStakeModal(false);
        library.waitForTransaction(tx.hash).then((receipt: ethers.providers.TransactionReceipt) => {
          toast.dismiss(toastId);
          toast.success('Tx successful!');
          const updated = Date.now();
          setLastUpdated(updated);
          getTotalStakedFor(account);
        });
      }
    }
  };

  useEffect(() => {
    if (addrStaked) {
      getQueryUnstake(addrStaked);
      const interval = setInterval(() => {
        getQueryUnstake(addrStaked);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [addrStaked, lastUpdated]);

  useEffect(() => {
    if (geyser && account) {
      getStakingToken();
      getDistributionToken();
      getTotalStakedFor(account);
      getTotalStaked();
      getSchedule();
    }
  }, [geyser, account, lastUpdated]);

  useEffect(() => {
    if (library) {
      setSigner(library.getSigner(account));
    }
  }, [library, setSigner]);

  useEffect(() => {
    if (library && geyser && lpContract && account) {
      getAccounting();
      getLPBalance(account);
      getLPAllowance(account);
    }
  }, [library, geyser, lpContract, account, lastUpdated]);

  const openStake = (): void => {
    setShowStakeModal(true);
  };

  const openUnstake = (): void => {
    setShowUnstakeModal(true);
  };

  return (
    <>
      <StakeModal open={showStakeModal} setShowModal={setShowStakeModal} lpBalance={lpBalance} stake={stake} allowanceAmount={Number(allowance)} />
      <UnstakeModal
        open={showUnstakeModal}
        setShowModal={setShowUnstakeModal}
        addressStaked={addrStaked}
        unstake={unstake}
        allowanceAmount={Number(allowance)}
      />

      {/* HEADING */}
      <div
        className="mt-10 overflow-hidden shadow rounded-lg divide-y divide-gray-200 justify-center text-center
       text-3xl"
      >
        <div
          className="px-4 py-3 sm:px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white flex
        justify-center"
        >
          <SunIcon className="w-8 mr-4 text-indigo-400" />
          Sweep Storm Geyser Liquidity Mining
        </div>
      </div>

      {/* STAKE / UNSTAKE BUTTONS  */}
      {/* eslint-disable
                    no-nested-ternary */}
      { library ? (
        <>
          <div className="flex flex-wrap justify-center">
            <div className=" mt-12 text-xl text-white">
              <span
                className="rounded px-8 py-2 mx-5  text-xl bg-gradient-to-br from-indigo-600 via-indigo-800 to-gray-700
            cursor-pointer hover:text-indigo-300 border border-indigo-700  hover:border hover:border-indigo-500"
                onClick={() => openStake()}
                onKeyDown={() => openStake()}
                role="button"
                tabIndex={0}
              >
                Add Stake
              </span>
            </div>
            <div className=" mt-12 text-xl text-white">
              <span
                className="rounded px-8 py-2 mx-5  text-xl bg-gradient-to-br from-gray-600 via-gray-800 to-gray-700
            cursor-pointer hover:text-indigo-300 border border-gray-700  hover:border hover:border-indigo-500"
                onClick={() => openUnstake()}
                onKeyDown={() => openUnstake()}
                role="button"
                tabIndex={0}
              >
                Remove Stake
              </span>
            </div>
          </div>
        </>
      ) : <div className="flex flex-wrap justify-center"><ConnectModal /></div>}

      {/* STAKE DETAILS  */}

      {geyser ? (
        <>
          <div className="flex flex-wrap justify-center">
            {/* ASSET  */}
            <div
              className="flex-auto w-3 h-52 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center
            text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 "
            >
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Asset
              </div>
              <div className="text-white mt-4 mb-4 flex justify-center">
                {/* TODO: get from contract */}
                <img className="h-10 w-auto bg-gray-800 rounded-full" src={bnblogo} alt="" />
                <img className="h-10 transform -translate-x-4 bg-gray-800 rounded-full" src={logo} alt="" />
                <span className="text-indigo-400 text-xl mt-1">BNB-SWEEP</span>
              </div>
              <div className="">
                {/* TODO: get from contract */}
                <a href="https://exchange.pancakeswap.finance/#/add/BNB/0x9Ab776357142694841d42c1abE08c817a7D13400">
                  <span
                    className="text-indigo-400 text-xl border border-indigo-400 border-opacity-50 rounded p-2
                  cursor-pointer hover:bg-indigo-400 hover:text-white"
                  >
                    PancakeSwap
                  </span>
                </a>
              </div>
            </div>

            <div
              className="flex-auto w-3 h-50 mr-3 mt-8 overflow-hidden shadow rounded-lg justify-center text-center
            text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
            >
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Geyser:
              </div>
              <div className="text-white mt-4 text-xl">
                Total Staked:
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp
                    separator=","
                    decimals={4}
                    duration={1}
                    end={totalStaked ? Number(ethers.utils.formatEther(totalStaked)) : 0}
                  />
                </span>
                <span className="text-indigo-400 ml-1">SWEEP-BNB LP</span>
              </div>
              <div className="text-white mt-4 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp
                    separator=","
                    decimals={4}
                    duration={1}
                    end={totalLocked ? Number(ethers.utils.formatEther(totalLocked.toString())) : 0}
                  />
                </span>
                <span className="text-indigo-400 ml-1">SWEEP in Geyser</span>
              </div>
              <div className="text-white mt-4 text-xl">
                <span className="text-indigo-400 ml-1">Ends: </span>
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  {endDate?.toLocaleDateString('en-gb', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'utc',
                    timeZoneName: 'short',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* SECOND ROW  */}
          <div className="flex flex-wrap justify-center">
            {/* LP BALANCE  */}
            <div
              className="flex-auto w-3 mr-3 mt-10 overflow-hidden shadow rounded-lg justify-center
             text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"
            >
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                LP Balance:
              </div>
              <div className="text-white mt-8 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," decimals={6} duration={1} end={lpBalance} />
                </span>
                <span className="text-indigo-400 ml-1">BNB-SWEEP LP</span>
              </div>
            </div>

            {/* POSITION  */}
            <div
              className="flex-auto w-5 h-50 mr-3 mt-10 overflow-hidden shadow rounded-lg
            justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 "
            >
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <FireIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Position:
              </div>
              <div className="text-white mt-8 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp
                    separator=","
                    decimals={6}
                    duration={1}
                    end={addrStaked ? Number(ethers.utils.formatEther(addrStaked)) : 0}
                  />
                </span>
                <span className="text-indigo-400 ml-1">BNB-SWEEP LP Staked</span>
              </div>
            </div>

            {/* EARNINGS  */}
            <div
              className="flex-auto w-5 h-48 mr-3 mt-10 overflow-hidden shadow rounded-lg
            justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 "
            >
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <FireIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Earnings:
              </div>
              <div className="text-white mt-8 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp
                    separator=","
                    decimals={10}
                    duration={25}
                    preserveValue
                    start={0}
                    end={queryUnstake ? Number(ethers.utils.formatEther(queryUnstake)) : 0}
                  />
                </span>
                <span className="text-indigo-400 ml-1">SWEEP earned</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Storm;
