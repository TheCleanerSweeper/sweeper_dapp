import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { GiftIcon } from '@heroicons/react/outline';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

import { AirdropData } from '../../../utils/airdrop';

const redeem = async (address, amount, airdropInfo, airdropSigner): Promise<void> => {
  await airdropSigner.redeemPackage(airdropInfo.index, address, amount, airdropInfo.proof);
};

interface AirdropProps {
  isRedeem: boolean;
  claimAmount: number;
  expiration: Date;
  adInfo: AirdropData;
  adSigner: ethers.Contract;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClaimAirdropPopup: React.FC<AirdropProps> = ({
  open,
  setOpen,
  claimAmount,
  isRedeem,
  expiration,
  adInfo,
  adSigner,
}: AirdropProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const [claimableAmount, setClaimableAmount] = useState(claimAmount);
  const [isRedeemed, setIsRedeemed] = useState(isRedeem);

  const [address, setAddress] = useState(account);

  const [expire, setExpire] = useState(expiration);
  const [airdropInfo, setAirdropInfo] = useState(adInfo);

  const [airdropSigner, setAirdropSigner] = useState(adSigner);

  const cancelButtonRef = useRef();

  useEffect(() => {
    setAddress(account);
  }, [account]);

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
                      {isRedeemed ? 'Claimed' : 'Claimable'} Amount:{' '}
                      <span
                        className="border rounded-md pt-1 pb-1 pl-4
                      pr-4 bg-gray-900"
                      >
                        {claimableAmount / Math.pow(10, 18)}
                      </span>{' '}
                      $SWEEP 🧹
                    </p>
                  </div>
                  {!isRedeemed && expire > new Date(0) ? (
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

              {isRedeemed || claimableAmount === 0 ? (
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

export default ClaimAirdropPopup;
