import { ethers } from 'ethers';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { FireIcon, SunIcon, BanIcon } from '@heroicons/react/outline';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Dialog, Transition } from '@headlessui/react';
import EthIcon from 'eth-icon';
import logo from '../../../images/logo.svg';
import bnblogo from '../../../images/bnblogo.svg';
import { shortenAddress } from '../../../utils/index';

interface UnstakeModalProps {
  open: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addressStaked: number;
  unstake: (amount: number | string) => Promise<void>;
  allowanceAmount: number;
}

const UnstakeModal: React.FC<UnstakeModalProps> = ({ open, setShowModal, addressStaked, unstake, allowanceAmount }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const [amount, setAmount] = useState<number | string>();
  const [addrStaked, setAddrStaked] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);

  const [validInput, setValidInput] = useState<boolean>(true);
  const [invalidityReason, setInvalidityReason] = useState<string>();

  const { account, active } = useWeb3React<Web3Provider>();

  const closeModal = (): void => {
    setIsOpen(false);
    setShowModal(false);
  };

  useEffect(() => {
    setAllowance(allowanceAmount);
  }, [allowanceAmount]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setAddrStaked(addressStaked);
  }, [addressStaked]);

  const validateInput = (input: string | number): void => {
    setAmount(input);
    const num = Number(input);
    if (!num) {
      setInvalidityReason('Input is not a valid number');
      setValidInput(false);
      /* eslint-disable no-restricted-properties */
    } else if (Number(num) > Number(addrStaked / Math.pow(10, 18))) {
      setInvalidityReason('Input is higher than Staked LP balance');
      setValidInput(false);
    } else {
      setInvalidityReason('');
      setValidInput(true);
    }
  };

  useEffect(() => {
    validateInput(amount);
  }, [amount]);

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
                        {account ? (
                          <EthIcon
                            className="inline-block h-9 w-9 rounded-full mx-3"
                            // Address to draw
                            address={account}
                            // scale * 8 pixel image size
                            scale={8}
                            // <img> props
                            style={{
                              background: 'red',
                            }}
                          />
                        ) : null}
                        {active ? `${shortenAddress(account, 12)}` : 'Wallet Not Connected'}
                      </div>

                      {/* LP BALANCE ROW  */}
                      <div className="flex justify-center mb-6 border rounded py-4 border-indigo-400 border-opacity-10">
                        <div className="align-baseline flex mt-2 pr-4">Staked: </div>
                        <img className="h-10 w-auto bg-gray-900 rounded-full" src={bnblogo} alt="" />
                        <img className="h-10 transform -translate-x-4 bg-gray-900 rounded-full" src={logo} alt="" />
                        <div className="align-baseline flex mt-2">
                          {ethers.utils.formatEther(addrStaked)}{' '}
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
                        <input
                          type="text"
                          value={amount || ''}
                          onChange={(e) => validateInput(e.target.value)}
                          placeholder="BNB-SWEEP LP Amount"
                          className="px-3 py-3 placeholder-indigo-300 text-white relative border border-indigo-700
                            border-opacity-40 bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded
                            text-center text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                        />
                        <div className="text-md text-white text-center justify-center ml-4 mt-2">
                          <span
                            className="rounded py-2 px-4 text-lg cursor-pointer hover:text-indigo-300 border
                              border-indigo-700 border-opacity-40   hover:border hover:border-indigo-500"
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
                    className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm 
                      px-4 py-2 text-base font-medium text-white hover:bg-indigo-700 sm:text-sm ${
                        validInput
                          ? 'bg-gradient-to-br from-indigo-400 via-indigo-600 to-gray-700'
                          : 'bg-gradient-to-br from-indigo-200 via-indigo-400 to-gray-500'
                      }`}
                    onClick={() => unstake(amount)}
                  >
                    { allowance > 0 ? 'Unstake' : 'Allow' }
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

export default UnstakeModal;
