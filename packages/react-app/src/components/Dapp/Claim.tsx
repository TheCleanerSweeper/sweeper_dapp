import React, { Fragment, useRef, useState, useEffect, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { GiftIcon } from '@heroicons/react/outline';
import EthIcon from 'eth-icon';
import { ethers } from 'ethers';

import { addresses, abis } from '@project/contracts';
import { getAirdropInfo, getClaimableAmount } from '../../utils/airdrop.js';
import FallingBunnies from '../Effects.js';

const redeem = async (address, amount, airdropInfo, airdropSigner): none => {
  await airdropSigner.redeemPackage(airdropInfo.index, address, amount, airdropInfo.proof);
};

const checkClaim = async (
  address: any,
  provider: any,
  signer: any,
  setClaimableAmount: any,
  setShowPopup: any,
  setIsRedeemed: any,
  setExpire: any,
  setAirdropInfo: any,
  setAirdropSigner: any,
): none => {
  const contractAddress: string = addresses.airdropBSCMainnet;
  const abi = abis.airdrop;
  const airdropContract: ethers.Contract = new ethers.Contract(contractAddress, abi, provider);
  const airdrop: ethers.Contract = airdropContract.connect(signer);
  setAirdropSigner(airdrop);

  // Return details from the airdrop json
  const airdropInfo = getAirdropInfo(address);

  // The address is not in the airdrop
  if (!airdropInfo) {
    setClaimableAmount(0);
    setIsRedeemed(false);
    setExpire(0);
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

interface Props {
  addEthereum: any;
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

export function ClaimModal({
  addEthereum,
  provider,
  signer,
  balance,
  setClaimableAmount,
  setShowPopup,
  setIsRedeemed,
  setExpire,
  setAirdropInfo,
  setAirdropSigner,
}: props): ReactNode<Props> {
  return (
    <div
      className="mt-16 overflow-hidden shadow rounded-lg
     divide-y divide-gray-200 justify-center text-center text-3xl bg-gray-200"
    >
      <div
        className="px-4 py-5 sm:px-6
       bg-gray-800 text-white"
      >
        🎁 Claim Tokens 🎁
      </div>
      <div className="flex sm:p-6 h-auto h-auto text-2xl  mt-4 justify-center">
        <div flex w-full pt-40 mb-36>
          {props.address ? (
            <EthIcon
              className="inline-block h-9 w-9 rounded-full mx-3"
              // Address to draw
              address={props.address}
              // scale * 8 pixel image size
              scale={8}
              // <img> props
              style={{
                background: 'red',
              }}
            />
          ) : null}
          {props.address ? `Address: ${props.address}` : 'Wallet Not Connected'}
          {!props.address ? (
            <button
              onClick={() => addEthereum()}
              type="button"
              className="
              inline-flex ml-4 justify-center rounded-md border
              border-gray-300 shadow-sm px-4 py-2 bg-white text-base
              font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0
              sm:col-start-1 sm:text-sm"
            >
              Connect Wallet
            </button>
          ) : null}
        </div>
      </div>

      {balance ? (
        <div className="flex sm:p-6  text-2xl  justify-center">
          <div flex w-full mb-36>
            Balance:{' '}
            <span
              className="rounded-md border border-gray-300 pt-2
             pb-2 pl-4 pr-4 bg-gray-100"
            >
              {balance}
            </span>{' '}
            🧹$SWEEP🧹
          </div>
        </div>
      ) : null}

      {props.address ? (
        <button
          type="button"
          className="flex w-9/12 inline-flex justify-center
          rounded-md border border-gray-300 shadow-sm mb-10 py-4
          bg-white text-base font-medium text-gray-700 hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={() => {
            checkClaim(
              props.address,
              // "0x949f435a2508f397c42b5b85993132de9600a3b9",
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
          // ref={cancelButtonRef}
        >
          Check Eligibility
        </button>
      ) : null}
    </div>
  );
}

interface ClaimProps {
  address: any;
  addEthereum: any;
  provider: any;
  signer: any;
}

export default function Claim({ address, addEthereum, provider, signer }: props): ReactNode<ClaimProps> {
  const [balance, setBalance] = useState(props.sweeperBalance);

  const [showPopup, setShowPopup] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [expire, setExpire] = useState(0);

  const [airdropSigner, setAirdropSigner] = useState();

  const [airdropInfo, setAirdropInfo] = useState();

  useEffect(() => {
    setBalance(props.sweeperBalance);
  }, [props.sweeperBalance]);

  return (
    <>
      {showPopup && !isRedeemed && claimableAmount > 0 ? <FallingBunnies /> : null}
      <ClaimModal
        address={address}
        balance={balance}
        addEthereum={addEthereum}
        provider={provider}
        signer={signer}
        setShowPopup={setShowPopup}
        setClaimableAmount={setClaimableAmount}
        setIsRedeemed={setIsRedeemed}
        setExpire={setExpire}
        setAirdropInfo={setAirdropInfo}
        setAirdropSigner={setAirdropSigner}
      />
      <ClaimInfoPopup />
      <ClaimAirdropPopup
        address={address}
        open={showPopup}
        setOpen={setShowPopup}
        claimableAmount={claimableAmount}
        isRedeemed={isRedeemed}
        expire={expire}
        airdropInfo={airdropInfo}
        airdropSigner={airdropSigner}
      />
    </>
  );
}

export function ClaimInfoPopup() {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef();

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
            className="hidden sm:inline-block sm:align-middle 
          sm:h-screen"
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
              className="inline-block align-bottom 
            bg-white rounded-lg px-4 pt-5 pb-4 text-left 
            overflow-hidden shadow-xl transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div>
                <div
                  className="mx-auto flex items-center 
                justify-center h-12 w-12 rounded-full bg-green-100"
                >
                  <GiftIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Claim Airdrop
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Allocations of $SWEEP are airdropped to rugpull victims and community contributers. Continue on to
                      check if your address is available to earn $SWEEP.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full
                  rounded-md border border-transparent
                   shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium
                    text-white hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Okay
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export function ClaimAirdropPopup({
  address,
  claimableAmount,
  isRedemmed,
  expire,
  airdropInfo,
  airdropSigner,
  open,
  setOpen,
}: props): ReactNode {
  const [claimableAmount, setClaimableAmount] = useState(props.claimableAmount);
  const [isRedeemed, setIsRedeemed] = useState(props.isRedeemed);

  const [address, setAddress] = useState(props.address);

  const [expire, setExpire] = useState(props.expire);
  const [airdropInfo, setAirdropInfo] = useState(props.airdropInfo);

  const [airdropSigner, setAirdropSigner] = useState(props.airdropSigner);

  const cancelButtonRef = useRef();

  useEffect(() => {
    setAddress(props.address);
  }, [address]);

  useEffect(() => {
    setOpen(props.open);
  }, [open, setOpen]);

  useEffect(() => {
    setClaimableAmount(props.claimableAmount);
  }, [claimableAmount]);

  useEffect(() => {
    setIsRedeemed(props.isRedeemed);
  }, [isRedeemed]);

  useEffect(() => {
    setExpire(props.expire);
  }, [expire]);

  useEffect(() => {
    setAirdropInfo(props.airdropInfo);
  }, [airdropInfo]);

  useEffect(() => {
    setAirdropSigner(props.airdropSigner);
  }, [airdropSigner]);

  return (
    <Transition.Root show={props.open} as={Fragment}>
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
              className="inline-block align-bottom bg-white rounded-lg
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
                  font-medium text-gray-900"
                  >
                    {isRedeemed ? 'Airdrop redeemed' : claimableAmount > 0 ? `You have a claim!` : 'No Claim Available'}
                  </Dialog.Title>
                  <div className="mt-8 mb-8">
                    <p className="text-xl text-gray-500">
                      {isRedeemed ? 'Claimed' : 'Claimable'}
                      Amount:{' '}
                      <span
                        className="border rounded-md pt-1 pb-1 pl-4
                      pr-4 bg-gray-100"
                      >
                        {claimableAmount / Math.pow(10, 18)}
                      </span>{' '}
                      $SWEEP 🧹
                    </p>
                  </div>
                  {!isRedeemed && expire ? (
                    <div
                      className="mt-2 mb-2 border rounded-md 
                    py-6 bg-gray-100"
                    >
                      <p className="text-base text-gray-500">
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

              {isRedeemed || claimableAmount == 0 ? (
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
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
}
