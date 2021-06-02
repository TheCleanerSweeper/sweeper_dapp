import React, { useState, useEffect, useRef } from 'react';
import { BanIcon } from '@heroicons/react/outline';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import EthIcon from 'eth-icon';

import DropDown from './DropDown';
import { shortenAddress } from '../../../utils/index';

const burn = async (amount: string | number): Promise<void> => {
  if (true) {
    // const s = lpContract.connect(signer);
    // if (Number(allowance) === 0) {
    //   const approveTx = await s.approve(addresses.geyserBSCMainnet, ethers.constants.MaxUint256);
    //   const approveToastId = toast.loading('Waiting for transaction...', {
    //     duration: 50000,
    //   });
    //   library.waitForTransaction(approveTx.hash).then((receipt: ethers.providers.TransactionReceipt) => {
    //     toast.dismiss(approveToastId);
    //     toast.success('tx successful!');
    //     getLPAllowance(account);
    //   });
    // } else {
    //   const sg = geyser.connect(signer);
    //   const stakeAmount = ethers.utils.parseUnits(amount.toString(), 18);
    //   const tx = await sg.stake(stakeAmount, '0x00');
    //   const toastId = toast.loading('Waiting for transaction...', {
    //     duration: 50000,
    //   });
    //   setShowStakeModal(false);
    //   library.waitForTransaction(tx.hash).then((receipt: ethers.providers.TransactionReceipt) => {
    //     toast.dismiss(toastId);
    //     toast.success('Tx successful!');
    //     const updated = Date.now();
    //     setLastUpdated(updated);
    //     getTotalStakedFor(account);
    //   });
    // }
  }
};

const BurnModal: React.FC = () => {
  const [amount, setAmount] = useState<number | string>();
  const [lpBal, setlpbBal] = useState<number>(0);
  const [allowance, setAllowance] = useState<number>(0);

  const [validInput, setValidInput] = useState<boolean>(true);
  const [invalidityReason, setInvalidityReason] = useState<string>();

  const { account, active } = useWeb3React<Web3Provider>();

  const validateInput = (input: string | number): void => {
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

  useEffect(() => {
    validateInput(amount);
  }, [amount]);

  const cancelButtonRef = useRef();

  return (
    <div
      className="flex items-end justify-center min-h-screen
       pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        className="inline-block align-bottom bg-gradient-to-br  from-gray-800 via-gray-900 to-gray-800 rounded-lg
          px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
          transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      >
        <div className="text-center">
          {/* HEADER  */}
          <div className="mb-3 pt-0 text-white">
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
              {active ? `${shortenAddress(account)}` : 'Wallet Not Connected'}
            </div>

            {/* LP BALANCE ROW  */}
            <div className="flex justify-center mb-6 border rounded py-4 border-indigo-400 border-opacity-10">
              <div className="align-baseline flex mt-2 pr-4">Shitcoins: </div>
              <div className="align-baseline flex mt-2">{/* <DropDown /> */}</div>
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
                placeholder="Burn Amount"
                className="px-3 py-3 placeholder-indigo-300 text-white relative border border-indigo-700
                           border-opacity-40 bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded text-center
                           text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
              <div className="text-md text-white text-center justify-center ml-4 mt-2">
                <span
                  className="rounded py-2 px-4 text-lg cursor-pointer hover:text-indigo-300 border
                            border-indigo-700 border-opacity-40 hover:border hover:border-indigo-500"
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

        <div className="flex justify-center ">
          {/* Burn BUTTON  */}
          <div className="sm:mt-6 w-full">
            <button
              disabled={!validInput}
              type="button"
              ref={cancelButtonRef}
              className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 
                    py-2 text-base font-medium text-white hover:bg-indigo-700 sm:text-sm ${
                      validInput
                        ? 'bg-gradient-to-br from-indigo-400 via-indigo-600 to-gray-700'
                        : 'bg-gradient-to-br from-indigo-200 via-indigo-400 to-gray-500'
                    }`}
              onClick={() => burn(amount)}
            >
              {allowance > 0 ? 'Burn' : 'Approve'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnModal;
