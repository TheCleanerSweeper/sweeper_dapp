import React from 'react';
import EthIcon from 'eth-icon';
import { addresses, abis } from '@project/contracts';
import { GiftIcon } from '@heroicons/react/outline';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { getAirdropInfo, getClaimableAmount, AirdropData } from '../../../utils/airdrop';

const checkClaim = async (
  address: string,
  provider: ethers.providers.Web3Provider,
  signer: string | ethers.providers.Provider | ethers.Signer,
  setClaimableAmount: React.Dispatch<React.SetStateAction<number>>,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
  setIsRedeemed: React.Dispatch<React.SetStateAction<boolean>>,
  setExpire: React.Dispatch<React.SetStateAction<Date>>,
  setAirdropInfo: React.Dispatch<React.SetStateAction<AirdropData>>,
  setAirdropSigner: React.Dispatch<React.SetStateAction<ethers.Contract>>,
): Promise<void> => {
  const contractAddress: string = addresses.airdropBSCMainnet;
  const abi = abis.airdrop;
  const airdropContract: ethers.Contract = new ethers.Contract(contractAddress, abi, provider);
  const airdrop: ethers.Contract = airdropContract.connect(signer);
  setAirdropSigner(airdrop);

  // Return details from the airdrop json
  const airdropInfo: AirdropData = getAirdropInfo(address);

  // console.log(airdropInfo, airdrop);

  // The address is not in the airdrop
  if (!airdropInfo) {
    setClaimableAmount(0);
    setIsRedeemed(false);
    setExpire(new Date(0));
  } else {
    const claimableAmount = getClaimableAmount(airdropInfo);
    const isRedeemed = await airdrop.redeemed(airdropInfo.index);

    /* prettier-ignore */
    const expire = await airdrop._blockDeadline(); // eslint-disable-line
    const date = new Date(expire.toString() * 1000);

    setIsRedeemed(isRedeemed);
    setClaimableAmount(Number(claimableAmount));
    setExpire(date);
    setAirdropInfo(airdropInfo);
  }

  setShowPopup(true);
};

interface ClaimCardProps {
  signer: string | ethers.providers.Provider | ethers.Signer;
  balance: string;
  setClaimableAmount: React.Dispatch<React.SetStateAction<number>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRedeemed: React.Dispatch<React.SetStateAction<boolean>>;
  setExpire: React.Dispatch<React.SetStateAction<Date>>;
  setAirdropInfo: React.Dispatch<React.SetStateAction<AirdropData>>;
  setAirdropSigner: React.Dispatch<React.SetStateAction<ethers.Contract>>;
}

const ClaimCard: React.FC<ClaimCardProps> = ({
  signer,
  balance,
  setClaimableAmount,
  setShowPopup,
  setIsRedeemed,
  setExpire,
  setAirdropInfo,
  setAirdropSigner,
}: ClaimCardProps) => {
  const { library, account } = useWeb3React<Web3Provider>();
  return (
    <div
      className="mt-16 overflow-hidden shadow rounded-lg justify-center text-center
   text-3xl bg-gradient-to-br  from-gray-700 via-gray-800 to-gray-700"
    >
      <div
        className="flex  justify-center text-center px-4 py-5 sm:px-6
      bg-gradient-to-br  from-gray-800 via-gray-900 to-gray-800 text-white"
      >
        <GiftIcon width="38px" className="text-indigo-400" />
        Claim Tokens
      </div>
      <div className="flex sm:p-6 h-auto h-auto text-2xl  mt-4 justify-center text-white">
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
        {account ? `Address: ${account}` : 'Wallet Not Connected'}
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

      {account ? (
        <button
          type="button"
          className="flex w-9/12 inline-flex justify-center
          rounded-md border border-gray-300 shadow-sm mb-10 py-4
          bg-gradient-to-br from-indigo-500 via-indigo-500 to-indigo-400
          text-base font-medium text-white hover:bg-gray-50
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={() => {
            checkClaim(
              account,
              library,
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
};
export default ClaimCard;
