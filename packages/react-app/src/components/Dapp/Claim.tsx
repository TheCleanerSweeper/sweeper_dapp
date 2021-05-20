import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { GiftIcon } from '@heroicons/react/outline';
import EthIcon from 'eth-icon';
import { addresses, abis } from '@project/contracts';
import { ethers } from 'ethers';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import Popup from './Popup';
import { getAirdropInfo, getClaimableAmount, AirdropData } from '../../utils/airdrop';
import FallingBunnies from '../Effects.js';

const redeem = async (address, amount, airdropInfo, airdropSigner): Promise<void> => {
  await airdropSigner.redeemPackage(airdropInfo.index, address, amount, airdropInfo.proof);
};

const checkClaim = async (
  address: string,
  provider: ethers.providers.Web3Provider,
  signer: string | ethers.providers.Provider | ethers.Signer,
  setClaimableAmount: React.Dispatch<React.SetStateAction<string>>,
  setShowPopup: any,
  setIsRedeemed: React.Dispatch<React.SetStateAction<boolean>>,
  setExpire: React.Dispatch<React.SetStateAction<Date>>,
  setAirdropInfo: React.Dispatch<React.SetStateAction<AirdropData>>,
  setAirdropSigner: any,
): Promise<void> => {
  const contractAddress: string = addresses.airdropBSCMainnet;
  const abi = abis.airdrop;
  const airdropContract: ethers.Contract = new ethers.Contract(contractAddress, abi, provider);
  const airdrop: ethers.Contract = airdropContract.connect(signer);
  setAirdropSigner(airdrop);

  // Return details from the airdrop json
  const airdropInfo: AirdropData = getAirdropInfo(address);

  // The address is not in the airdrop
  if (!airdropInfo) {
    setClaimableAmount('0');
    setIsRedeemed(false);
    setExpire(new Date(0));
  } else {
    const claimableAmount = getClaimableAmount(airdropInfo);
    const isRedeemed = await airdrop.redeemed(airdropInfo.index);

    /* prettier-ignore */
    const expire = await airdrop._blockDeadline(); // eslint-disable-line
    const date = new Date(expire.toString() * 1000);

    setIsRedeemed(isRedeemed);
    setClaimableAmount(claimableAmount);
    setExpire(date);
    setAirdropInfo(airdropInfo);
  }

  setShowPopup(true);
};

interface ClaimCardProps {
  address: string;
  provider: any;
  signer: any;
  balance: any;
  setClaimableAmount: any;
  setShowPopup: any;
  setIsRedeemed: any;
  setExpire: any;
  setAirdropInfo: any;
  setAirdropSigner: any;
}

const ClaimCard: React.FC<ClaimCardProps> = ({
  address,
  provider,
  signer,
  balance,
  setClaimableAmount,
  setShowPopup,
  setIsRedeemed,
  setExpire,
  setAirdropInfo,
  setAirdropSigner,
}: ClaimCardProps) => (
  <div
    className="mt-16 overflow-hidden shadow rounded-lg
     divide-y divide-indigo-400 justify-center text-center text-3xl bg-gradient-to-br  from-gray-700 via-gray-800 to-gray-700"
  >
    <div
      className="flex  justify-center text-center px-4 py-5 sm:px-6
      bg-gradient-to-br  from-gray-800 via-gray-900 to-gray-800 text-white"
    >
      <GiftIcon width="38px" className="text-indigo-400" />
      {' '}
      Claim Tokens
    </div>
    <div className="flex sm:p-6 h-auto h-auto text-2xl  mt-4 justify-center text-white">
      {address ? (
        <EthIcon
          className="inline-block h-9 w-9 rounded-full mx-3"
          // Address to draw
          address={address}
          // scale * 8 pixel image size
          scale={8}
          // <img> props
          style={{
            background: 'red',
          }}
        />
      ) : null}
      {address ? `Address: ${address}` : 'Wallet Not Connected'}
    </div>

    {balance ? (
      <div className="flex sm:p-6  text-2xl justify-center text-white">
        Balance:
        <span
          className="rounded-md border border-gray-300 pt-2
             pb-2 pl-4 pr-4 ml-2 mr-2 bg-gray-900 transform -translate-y-2"
        >
          {balance}
        </span>
        🧹$SWEEP🧹
      </div>
    ) : null}

    {address ? (
      <button
        type="button"
        className="flex w-9/12 inline-flex justify-center
          rounded-md border border-gray-300 shadow-sm mb-10 py-4
          bg-gradient-to-br from-indigo-500 via-indigo-500 to-indigo-400  text-base font-medium text-white hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
        onClick={() => {
          checkClaim(
            address,
            provider,
            signer,
            setClaimableAmount,
            setShowPopup,
            setIsRedeemed,
            setExpire,
            setAirdropInfo,
            setAirdropSigner,
          );
        }}
      >
        Check Eligibility
      </button>
    ) : null}
  </div>
);

interface AirdropProps {
  addr: string;
  isRedeem: any;
  claimAmount: any;
  expiration: any;
  adInfo: any;
  adSigner: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClaimAirdropPopup: React.FC<AirdropProps> = ({
  addr,
  open,
  setOpen,
  claimAmount,
  isRedeem,
  expiration,
  adInfo,
  adSigner,
}: AirdropProps) => {
  const [claimableAmount, setClaimableAmount] = useState(claimAmount);
  const [isRedeemed, setIsRedeemed] = useState(isRedeem);

  const [address, setAddress] = useState(addr);

  const [expire, setExpire] = useState(expiration);
  const [airdropInfo, setAirdropInfo] = useState(adInfo);

  const [airdropSigner, setAirdropSigner] = useState(adSigner);

  const cancelButtonRef = useRef();

  useEffect(() => {
    setAddress(addr);
  }, [addr]);

  useEffect(() => {
    setOpen(open);
  }, [open, setOpen]);

  useEffect(() => {
    setClaimableAmount(claimAmount);
  }, [claimAmount]);

  useEffect(() => {
    setIsRedeemed(isRedeem);
  }, [isRedeem]);

  useEffect(() => {
    setExpire(expiration);
  }, [expiration]);

  useEffect(() => {
    setAirdropInfo(adInfo);
  }, [adInfo]);

  useEffect(() => {
    setAirdropSigner(adSigner);
  }, [adSigner]);

  console.log(`is redeemd: ${isRedeem}`);
  console.log(`airdropAmount: ${claimableAmount}`);
  console.log(`expire: ${expire}`);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
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
                <div
                  className="mx-auto flex items-center justify-center h-12 w-12
                rounded-full bg-green-100"
                >
                  <GiftIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6
                  font-medium text-white"
                  >
                    {/* eslint-disable
                    no-nested-ternary,
                    no-restricted-properties,
                    react/jsx-one-expression-per-line */}
                    {isRedeemed ? 'Airdrop redeemed' : claimableAmount > 0 ? 'You have a claim!' : 'No Claim Available'}
                  </Dialog.Title>
                  <div className="mt-8 mb-8">
                    <p className="text-xl text-white">
                      {isRedeemed ? 'Claimed' : 'Claimable'}
                      Amount:{' '}
                      <span
                        className="border rounded-md pt-1 pb-1 pl-4
                      pr-4 bg-gray-900"
                      >
                        {claimableAmount / Math.pow(10, 18)}
                      </span>{' '}
                      $SWEEP 🧹
                    </p>
                  </div>
                  {!isRedeemed && expire > 0 ? (
                    <div
                      className="mt-2 mb-2 border rounded-md
                    py-6 bg-gray-100"
                    >
                      <p className="text-base text-white">
                        Expires:{' '}
                        {expire.toLocaleDateString('en-gb', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          timeZone: 'utc',
                          timeZoneName: 'short',
                        })}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {isRedeemed || Number(claimableAmount) === 0 ? (
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    ref={cancelButtonRef}
                    className="inline-flex justify-center w-full rounded-md
                    border border-transparent shadow-sm px-4 py-2 bg-indigo-600
                    text-base font-medium text-white hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Okay
                  </button>
                </div>
              ) : null}

              {!isRedeemed && claimableAmount > 0 ? (
                <div
                  className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2
                sm:gap-3 sm:grid-flow-row-dense"
                >
                  <button
                    ref={cancelButtonRef}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md
                    border border-transparent shadow-sm px-4 py-2 bg-indigo-600
                    text-base font-medium text-white hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={() => {
                      redeem(address, claimableAmount, airdropInfo, airdropSigner);
                      setOpen(false);
                    }}
                  >
                    Claim
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center
                    rounded-md border border-gray-300 shadow-sm px-4
                    py-2 bg-white text-base font-medium text-gray-700
                    hover:bg-gray-50 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
                    sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

interface ClaimProps {
  sweeperBalance: any;
}

const Claim: React.FC<ClaimProps> = ({ sweeperBalance }: ClaimProps) => {
  const [balance, setBalance] = useState(sweeperBalance);
  const [showPopup, setShowPopup] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [expire, setExpire] = useState(0);
  const [airdropSigner, setAirdropSigner] = useState();
  const [airdropInfo, setAirdropInfo] = useState();
  const [signer, setSigner] = useState<any>();
  const [open, setOpen] = useState(true);

  // closes the initial popup modal
  function closeModal(): void {
    setOpen(false);
  }

  const { library, account, active } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (!active) {
      setBalance(0);
      return;
    }
    setBalance(sweeperBalance);
  }, [sweeperBalance, active]);

  useEffect(() => {
    if (library) {
      setSigner(library.getSigner(account));
    }
  }, [library, setSigner, active]);

  return (
    <div>
      {showPopup && !isRedeemed && claimableAmount > 0 ? <FallingBunnies /> : null}
      <ClaimCard
        address={account}
        provider={library}
        signer={signer}
        balance={balance}
        setShowPopup={setShowPopup}
        setClaimableAmount={setClaimableAmount}
        setIsRedeemed={setIsRedeemed}
        setExpire={setExpire}
        setAirdropInfo={setAirdropInfo}
        setAirdropSigner={setAirdropSigner}
      />
      <Popup title="Claim Airdrop" open={open} setOpen={setOpen} onClose={closeModal}>
        <p className="text-sm text-gray-500">
          Allocations of $SWEEP are airdropped to rugpull victims and community contributers. Continue on to check if
          your address is available to earn $SWEEP.
        </p>
      </Popup>
      <ClaimAirdropPopup
        addr={account}
        open={showPopup}
        setOpen={setShowPopup}
        claimAmount={claimableAmount}
        isRedeem={isRedeemed}
        expiration={expire}
        adInfo={airdropInfo}
        adSigner={airdropSigner}
      />
    </div>
  );
};

export default Claim;
