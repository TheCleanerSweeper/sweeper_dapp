import { ethers } from 'ethers';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import {
  ChartBarIcon,
  CurrencyYenIcon,
  FireIcon,
  GiftIcon,
  SunIcon,
  BanIcon,
} from '@heroicons/react/outline';
import CountUp from 'react-countup';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Dialog, Transition } from '@headlessui/react';
import { addresses, abis } from '@project/contracts';
import EthIcon from 'eth-icon';
import { redeem } from '../../utils/airdrop';
import logo from '../../images/logo.svg';
import bnblogo from '../../images/bnblogo.svg';
import { shortenAddress, formatAmount, sleep } from '../../utils/index';

interface StakeModalProps {
  open: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  lpBalance: number;
  address: string,
  stake: (amount: number|string) => Promise<void>
}
const StakeModal:React.FC<StakeModalProps> = ({ open, setShowModal, lpBalance, address, stake }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [amount, setAmount] = useState<number|string>();
  const [addr, setAddr] = useState<string>();
  const [lpBal, setlpbBal] = useState<number>(0);

  const [validInput, setValidInput] = useState<boolean>(true);
  const [invalidityReason, setInvalidityReason] = useState<string>();

  const closeModal = (): any => {
    setIsOpen(false);
    setShowModal(false);
  };

  useEffect(() => { setIsOpen(open); }, [open]);

  useEffect(() => { setlpbBal(lpBalance); }, [lpBalance]);

  useEffect(() => { setAddr(address); }, [address]);

  const validateInput = (input: string|number): any => {
    setAmount(input);
    const num = Number(input);
    if (!num) {
      setInvalidityReason('Input is not a valid number');
      setValidInput(false);
    } else if (Number(num) > Number(lpBal)) {
      setInvalidityReason('Input is higher than LP balance');
      setValidInput(false);
    } else {
      setInvalidityReason('');
      setValidInput(true);
    }
  };

  useEffect(() => { validateInput(amount); }, [amount]);

  const cancelButtonRef = useRef();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={closeModal}
      >
        <div
          className="flex items-end justify-center min-h-screen
       pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500
          bg-opacity-75 transition-opacity"
            />
          </Transition.Child>

          <span
            className="hidden sm:inline-block
        sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-gradient-to-br  from-gray-800 via-gray-900 to-gray-800 rounded-lg
          px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
          transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl leading-6
                font-medium text-white"
                  >
                    {/* eslint-disable
                  no-nested-ternary,
                  no-restricted-properties,
                  react/jsx-one-expression-per-line */}

                    {/* HEADER  */}
                    <div className="justify-center text-center flex">
                      <SunIcon className="w-6 mr-2 text-indigo-400" />
                      Stake SWEEP
                    </div>
                  </Dialog.Title>
                  <div className="mt-8 mb-8">
                    <div className="mb-3 pt-0 text-white">

                      {/* ADDRESS ROW */}
                      <div className="flex sm:p-6 h-auto h-auto text-xl  mt-4 justify-center text-indigo-200">
                        {address ? (
                          <EthIcon
                            className="inline-block h-9 w-9 rounded-full mx-3"
                            // Address to draw
                            address={addr}
                            // scale * 8 pixel image size
                            scale={8}
                            // <img> props
                            style={{
                              background: 'red',
                            }}
                          />
                        ) : null}
                        {address ? `${shortenAddress(address, 12)}` : 'Wallet Not Connected'}
                      </div>

                      {/* LP BALANCE ROW  */}
                      <div className="flex justify-center mb-6 border rounded py-4 border-indigo-400 border-opacity-10">
                        <div className="align-baseline flex mt-2 pr-4">Balance: </div>
                        <img className="h-10 w-auto bg-gray-900 rounded-full" src={bnblogo} alt="" />
                        <img className="h-10 transform -translate-x-4 bg-gray-900 rounded-full" src={logo} alt="" />
                        <div className="align-baseline flex mt-2">
                          {lpBal}
                          {' '}
                          <span className="text-indigo-400 pl-2"> BSC-SWEEP LP</span>
                        </div>
                      </div>

                      {/* INVALIDITY ROW */}
                      {!validInput ? (
                        <div className="flex justify-center mb-6 border rounded py-2 border-red-700 border-opacity-80">
                          <BanIcon width="18" className="text-red-700 mr-2" />
                          <div className="align-baseline flex text-red-700">{invalidityReason}</div>
                        </div>
                      ) : null}

                      {/* INPUT ROW  */}
                      <div className="flex justify-center">
                        <input type="text" value={amount} onChange={(e) => validateInput(e.target.value)} placeholder="SWEEP Amount" className="px-3 py-3 placeholder-indigo-300 text-white relative border border-indigo-700 border-opacity-40 bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded  text-center text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                        <div className="text-md text-white text-center justify-center ml-4 mt-2">
                          <span
                            className="rounded py-2 px-4 text-lg cursor-pointer hover:text-indigo-300 border border-indigo-700 border-opacity-40   hover:border hover:border-indigo-500"
                            onClick={() => setAmount(lpBal)}
                            onKeyDown={() => setAmount(lpBal)}
                            role="button"
                            tabIndex={0}
                          >
                            Max
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* CANCEL BUTTON */}
              <div className="flex justify-center ">
                <div className="mt-5 ml-4 mr-4 sm:mt-6 w-full">
                  <button
                    type="button"
                    ref={cancelButtonRef}
                    className="inline-flex justify-center w-full rounded-md
                  border border-transparent shadow-sm px-4 py-2  bg-gradient-to-br  from-gray-200 via-white to-gray-200
                  text-base font-medium text-indigo-900 hover:bg-indigo-700 sm:text-sm"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                </div>

                {/* STAKE BUTTON  */}
                <div className="mt-5 ml-4 mr-4 sm:mt-6 w-full">
                  <button
                    disabled={!validInput}
                    type="button"
                    ref={cancelButtonRef}
                    className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 sm:text-sm ${validInput ? 'bg-gradient-to-br from-indigo-400 via-indigo-600 to-gray-700' : 'bg-gradient-to-br from-indigo-200 via-indigo-400 to-gray-500'}`}
                    onClick={() => stake(amount)}
                  >
                    Stake
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface UnstakeModalProps {
  open: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addressStaked: number;
  address: string,
  unstake: (amount: number|string) => Promise<void>
}
const UnstakeModal:React.FC<UnstakeModalProps> = ({ open, setShowModal, addressStaked, address, unstake }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [amount, setAmount] = useState<number|string>();
  const [addr, setAddr] = useState<string>();
  const [addrStaked, setAddrStaked] = useState<number>(0);

  const [validInput, setValidInput] = useState<boolean>(true);
  const [invalidityReason, setInvalidityReason] = useState<string>();

  const closeModal = (): any => {
    setIsOpen(false);
    setShowModal(false);
  };

  useEffect(() => { setIsOpen(open); }, [open]);

  useEffect(() => { setAddrStaked(addressStaked); }, [addressStaked]);

  useEffect(() => { setAddr(address); }, [address]);

  const validateInput = (input: string|number): any => {
    setAmount(input);
    const num = Number(input);
    if (!num) {
      setInvalidityReason('Input is not a valid number');
      setValidInput(false);
    } else if (Number(num) > Number(addrStaked / Math.pow(10, 18))) {
      setInvalidityReason('Input is higher than Staked LP balance');
      setValidInput(false);
    } else {
      setInvalidityReason('');
      setValidInput(true);
    }
  };

  useEffect(() => { validateInput(amount); }, [amount]);

  const cancelButtonRef = useRef();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={closeModal}
      >
        <div
          className="flex items-end justify-center min-h-screen
       pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500
          bg-opacity-75 transition-opacity"
            />
          </Transition.Child>

          <span
            className="hidden sm:inline-block
        sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-gradient-to-br  from-gray-800 via-gray-900 to-gray-800 rounded-lg
          px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
          transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl leading-6
                font-medium text-white"
                  >
                    {/* eslint-disable
                  no-nested-ternary,
                  no-restricted-properties,
                  react/jsx-one-expression-per-line */}

                    {/* HEADER  */}
                    <div className="justify-center text-center flex">
                      <SunIcon className="w-6 mr-2 text-indigo-400" />
                      Unstake SWEEP
                    </div>
                  </Dialog.Title>
                  <div className="mt-8 mb-8">
                    <div className="mb-3 pt-0 text-white">

                      {/* ADDRESS ROW */}
                      <div className="flex sm:p-6 h-auto h-auto text-xl  mt-4 justify-center text-indigo-200">
                        {address ? (
                          <EthIcon
                            className="inline-block h-9 w-9 rounded-full mx-3"
                            // Address to draw
                            address={addr}
                            // scale * 8 pixel image size
                            scale={8}
                            // <img> props
                            style={{
                              background: 'red',
                            }}
                          />
                        ) : null}
                        {address ? `${shortenAddress(address, 12)}` : 'Wallet Not Connected'}
                      </div>

                      {/* LP BALANCE ROW  */}
                      <div className="flex justify-center mb-6 border rounded py-4 border-indigo-400 border-opacity-10">
                        <div className="align-baseline flex mt-2 pr-4">Staked: </div>
                        <img className="h-10 w-auto bg-gray-900 rounded-full" src={bnblogo} alt="" />
                        <img className="h-10 transform -translate-x-4 bg-gray-900 rounded-full" src={logo} alt="" />
                        <div className="align-baseline flex mt-2">
                          {ethers.utils.formatEther(addrStaked)}
                          {' '}
                          <span className="text-indigo-400 pl-2"> BSC-SWEEP LP</span>
                        </div>
                      </div>

                      {/* INVALIDITY ROW */}
                      {!validInput ? (
                        <div className="flex justify-center mb-6 border rounded py-2 border-red-700 border-opacity-80">
                          <BanIcon width="18" className="text-red-700 mr-2" />
                          <div className="align-baseline flex text-red-700">{invalidityReason}</div>
                        </div>
                      ) : null}

                      {/* INPUT ROW  */}
                      <div className="flex justify-center">
                        <input type="text" value={amount} onChange={(e) => validateInput(e.target.value)} placeholder="BNB-SWEEP LP Amount" className="px-3 py-3 placeholder-indigo-300 text-white relative border border-indigo-700 border-opacity-40 bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded  text-center text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                        <div className="text-md text-white text-center justify-center ml-4 mt-2">
                          <span
                            className="rounded py-2 px-4 text-lg cursor-pointer hover:text-indigo-300 border border-indigo-700 border-opacity-40   hover:border hover:border-indigo-500"
                            onClick={() => setAmount(Number(addrStaked) / Math.pow(10, 18))}
                            onKeyDown={() => setAmount(Number(addrStaked) / Math.pow(10, 18))}
                            role="button"
                            tabIndex={0}
                          >
                            Max
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* CANCEL BUTTON */}
              <div className="flex justify-center ">
                <div className="mt-5 ml-4 mr-4 sm:mt-6 w-full">
                  <button
                    type="button"
                    ref={cancelButtonRef}
                    className="inline-flex justify-center w-full rounded-md
                  border border-transparent shadow-sm px-4 py-2  bg-gradient-to-br  from-gray-200 via-white to-gray-200
                  text-base font-medium text-indigo-900 hover:bg-indigo-700 sm:text-sm"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                </div>

                {/* STAKE BUTTON  */}
                <div className="mt-5 ml-4 mr-4 sm:mt-6 w-full">
                  <button
                    disabled={!validInput}
                    type="button"
                    ref={cancelButtonRef}
                    className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 sm:text-sm ${validInput ? 'bg-gradient-to-br from-indigo-400 via-indigo-600 to-gray-700' : 'bg-gradient-to-br from-indigo-200 via-indigo-400 to-gray-500'}`}
                    onClick={() => unstake(amount)}
                  >
                    Unstake
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface GeyserProps {
  geyserContract: ethers.Contract;
}

const Geyser: React.FC<GeyserProps> = ({ geyserContract }) => {
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
  const [geyser, setGeyser] = useState(geyserContract);

  // TODO: remove address
  const [address, setAddress] = useState<string>();
  // The balance of LP tokens for the connected address
  const [lpBalance, setlpbBalance] = useState<number>(0);
  // The amount of LP tokens staked for the connected address
  const [addrStaked, setAddrStaked] = useState<number>(0);
  // The total number of LP tokens staked by all users
  const [totalStaked, setTotalStaked] = useState<number>(0);
  // the amount of rewards to potentially get
  const [queryUnstake, setQueryUnstake] = useState<number|string>();

  // The amount of tokens locked in the geyser
  const [lockedGeyserBalance, setLockedGeyserBalance] = useState<number|string>();
  // the amount of tokens unlocked in the geyser
  const [unlockedGeyserBalance, setUnlockedGeyserBalance] = useState<number|string>();
  // total SWEEP locked in the geyser
  const [totalLocked, setTotalLocked] = useState<number|string>();
  // Timestamp the accounting info was updated
  const [accountingTimestamp, setAccountingTimestamp] = useState<number|string>();

  // State used to trigger refreshes / requerying
  const [lastUpdated, setLastUpdated] = useState<number>();

  const { library, account, active } = useWeb3React<Web3Provider>();

  // Get Accounting Data
  const getAccounting = async (): Promise<any> => {
    const updateAccounting = await geyser.callStatic.updateAccounting();

    const [lockedBalance, unlockedBalance, stakingShare, globalStakingShare, accumulatedReward, timestamp] = updateAccounting;

    // The total amount of BNB-SWEEP LP locked in the geyser
    const allLocked = Number(lockedBalance) + Number(unlockedBalance);

    setTotalLocked(allLocked);
    setLockedGeyserBalance(lockedBalance);
    setUnlockedGeyserBalance(unlockedBalance);
    setAccountingTimestamp(timestamp);
  };

  // The end date of the geyser
  const getSchedule = async (): Promise<any> => {
    const bonusPeriod = await geyser.bonusPeriodSec();
    const schedule = await geyser.unlockSchedules(0);
    const endSec = schedule[3];
    const end = (Number(bonusPeriod) + Number(endSec)) * 1000;

    const endTime = new Date(end);

    setEndDate(endTime);
  };

  // Query balance of LP tokens for the address
  const getLPBalance = async (addr: string): Promise<any> => {
    const contractAddress = addresses.lpSweepBSCMainnet;
    const abi = abis.sweeperdao;
    const contract = new ethers.Contract(contractAddress, abi, library);

    // TODO: set LP Contract in state
    // setLPContract(contract)

    const allowance = await contract.allowance(address, addresses.geyserBSCMainnet);

    const s = contract.connect(signer);
    if (Number(allowance) === 0) {
      await s.approve(addresses.geyserBSCMainnet, ethers.constants.MaxUint256);
    }

    const balance = await contract.balanceOf(addr);
    const nice = formatAmount(balance);
    setlpbBalance(Number(nice));
  };

  // LP token address
  const getStakingToken = async (): Promise<any> => {
    const stakingToken = await geyser?.getStakingToken();
    if (stakingToken) {
      setStakingTokenAddress(stakingToken);
    }
  };

  // SWEEEP Address
  const getDistributionToken = async (): Promise<any> => {
    const distributionToken = await geyser?.getDistributionToken();
    if (distributionToken) {
      setDistributionTokenAddress(distributionToken);
    }
  };

  // The LP Stake amount for a given address
  const getTotalStakedFor = async (addr: string): Promise<any> => {
    const totalStakedFor = await geyser?.totalStakedFor(addr);
    setAddrStaked(totalStakedFor);
    return ethers.utils.formatEther(totalStakedFor);
  };

  // The total amount staked between all global users
  const getTotalStaked = async (): Promise<any> => {
    const totalStakedWei = await geyser.totalStaked();
    setTotalStaked(totalStakedWei);
    return ethers.utils.formatEther(totalStaked);
  };

  // The amount of SWEEP a user would get if they unstake
  const getQueryUnstake = async (amount: number): Promise<any> => {
    if (amount) {
      const unstakeAmount = await geyser.callStatic.unstakeQuery(amount);
      setQueryUnstake(unstakeAmount);
    }
  };

  // Unstake `amount` of tokens
  const unstake = async (amount: number): Promise<void> => {
    if (geyser && signer) {
      const sg = geyser.connect(signer);
      const unstakeAmount = ethers.utils.parseUnits(amount.toString(), 18);

      console.log(`unformattedUnstake amount: ${amount}`);
      console.log(`unstake amount: ${unstakeAmount}`);

      const x = await sg.unstake(unstakeAmount, '0x00');

      console.log('stake result:');
      console.log(x);
      setShowUnstakeModal(false);

      await sleep(10000);
      console.log('done waiting for tx');

      const updated = Date.now();
      setLastUpdated(updated);
      getTotalStakedFor(address);
    }
  };

  const stake = async (amount: string|number): Promise<void> => {
    if (geyser && signer) {
      const sg = geyser.connect(signer);
      const stakeAmount = ethers.utils.parseUnits(amount.toString(), 18);

      const x = await sg.stake(stakeAmount, '0x00');
      console.log('stake results:');
      console.log(x.hash);
      console.log(x.hash);
      setShowStakeModal(false);

      const updated = Date.now();
      setLastUpdated(updated);
      getTotalStakedFor(address);
    }
  };

  useEffect(() => {
    if (addrStaked) {
      getQueryUnstake(addrStaked);
    }
  }, [addrStaked, lastUpdated]);

  useEffect(() => {
    setGeyser(geyserContract);
  }, [geyserContract]);

  useEffect(() => {
    if (geyser && address) {
      getStakingToken();
      getDistributionToken();
      getTotalStakedFor(address);
      getTotalStaked();
      getSchedule();
    }
  }, [geyser, address, lastUpdated]);

  useEffect(() => {
    if (library) {
      setSigner(library.getSigner(account));
    }
  }, [library, setSigner]);

  useEffect(() => {
    if (account) {
      setAddress(account);
    }
  }, [account]);

  useEffect(() => {
    if (library && geyser && address) {
      getAccounting();
      getLPBalance(address);
    }
  }, [library, geyser, address, lastUpdated]);

  const openStake = (): any => {
    setShowStakeModal(true);
  };

  const openUnstake = (): any => {
    setShowUnstakeModal(true);
  };

  return (
    <>
      <StakeModal open={showStakeModal} setShowModal={setShowStakeModal} lpBalance={lpBalance} address={address} stake={stake} />
      <UnstakeModal open={showUnstakeModal} setShowModal={setShowUnstakeModal} addressStaked={addrStaked} address={address} unstake={unstake} />

      {/* HEADING */}
      <div className="mt-10 overflow-hidden shadow rounded-lg divide-y divide-gray-200 justify-center text-center text-3xl">
        <div className="px-4 py-3 sm:px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white flex justify-center">
          <SunIcon className="w-8 mr-4 text-indigo-400" />
          Geyser
        </div>
      </div>

      {/* STAKE / UNSTAKE BUTTONS  */}
      <div className="flex flex-wrap justify-center ">
        <div className=" mt-12 text-xl text-white">
          <span
            className="rounded px-8 py-2 mx-5  text-xl bg-gradient-to-br from-indigo-600 via-indigo-800 to-gray-700 cursor-pointer hover:text-indigo-300 border border-indigo-700  hover:border hover:border-indigo-500"
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
            className="rounded px-8 py-2 mx-5  text-xl bg-gradient-to-br from-gray-600 via-gray-800 to-gray-700 cursor-pointer hover:text-indigo-300 border border-gray-700  hover:border hover:border-indigo-500"
            onClick={() => openUnstake()}
            onKeyDown={() => openUnstake()}
            role="button"
            tabIndex={0}
          >
            Remove Stake
          </span>
        </div>
      </div>

      {/* STAKE DETAILS  */}

      { geyserContract ? (
        <>
          <div className="flex flex-wrap justify-center">
            {/* ASSET  */}
            <div className="flex-auto w-3 h-52 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ">
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
                <a href="https://exchange.pancakeswap.finance/#/add/BNB/0x9Ab776357142694841d42c1abE08c817a7D13400"><span className="text-indigo-400 text-xl border border-indigo-400 border-opacity-50 rounded p-2 cursor-pointer hover:bg-indigo-400 hover:text-white">PancakeSwap</span></a>
              </div>
            </div>

            <div className="flex-auto w-3 h-50 mr-3 mt-8 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Geyser:
              </div>
              <div className="text-white mt-4 text-xl">
                Total Staked:
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," decimals={4} duration={1} end={totalStaked ? Number(ethers.utils.formatEther(totalStaked)) : 0} />
                </span>
                <span className="text-indigo-400 ml-1">SWEEP-BNB LP</span>
              </div>
              <div className="text-white mt-4 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," decimals={4} duration={1} end={totalLocked ? Number(ethers.utils.formatEther(totalLocked.toString())) : 0} />
                </span>
                <span className="text-indigo-400 ml-1">SWEEP in Geyser</span>
              </div>
              <div className="text-white mt-4 text-xl">
                <span className="text-indigo-400 ml-1">Ends: </span>
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  { endDate?.toLocaleDateString('en-gb', {
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
            <div className="flex-auto w-3 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
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
            <div className="flex-auto w-5 h-50 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <FireIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Position:
              </div>
              <div className="text-white mt-8 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," decimals={6} duration={1} end={addrStaked ? Number(ethers.utils.formatEther(addrStaked)) : 0} />
                </span>
                <span className="text-indigo-400 ml-1">BNB-SWEEP LP Staked</span>
              </div>
            </div>

            {/* EARNINGS  */}
            <div className="flex-auto w-5 h-48 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <FireIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Earnings:
              </div>
              <div className="text-white mt-8 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," decimals={6} duration={1} end={queryUnstake ? Number(ethers.utils.formatEther(queryUnstake)) : 0} />
                </span>
                <span className="text-indigo-400 ml-1">SWEEP earned</span>
              </div>
            </div>
          </div>

        </>
      ) : (
        <div className="mr-3 mt-10 overflow-hidden divide-y justify-center text-center text-3xl">
          <div className="h-full px-4 py-3 sm:px-6 text-white">
            <button
              onClick={() => console.log('hello ')}
              type="button"
              className=" inline-flex ml-4 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Connect wallet
            </button>
          </div>
        </div>
      )}

    </>
  );
};

export default Geyser;
