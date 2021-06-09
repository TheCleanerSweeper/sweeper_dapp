import React, { useState, useEffect } from 'react';

import { ethers } from 'ethers';

import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import Popup from '../Popup';
import ClaimCard from './ClaimCard';
import ClaimAirdropPopup from './AirdropPopup';
import FallingBunnies from '../../Effects.js';
import MobileWallet from '../WalletModal/MobileWallet';

interface ClaimProps {
  sweeperBalance: string;
}

const Claim: React.FC<ClaimProps> = ({ sweeperBalance }: ClaimProps) => {
  const [balance, setBalance] = useState<string>(sweeperBalance);
  const [showPopup, setShowPopup] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [expire, setExpire] = useState(new Date(0));
  const [airdropSigner, setAirdropSigner] = useState();
  const [airdropInfo, setAirdropInfo] = useState();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [open, setOpen] = useState(true);

  // closes the initial popup modal
  function closeModal(): void {
    setOpen(false);
  }

  const { library, account, active } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if (!active) {
      setBalance('0');
      return;
    }
    setBalance(sweeperBalance);
  }, [sweeperBalance, active]);

  useEffect(() => {
    if (library) {
      setSigner(library.getSigner(account));
    }
  }, [library, setSigner, account]);

  return (
    <div>
      {showPopup && !isRedeemed && claimableAmount > 0 ? <FallingBunnies /> : null}
      <ClaimCard
        signer={signer}
        balance={balance}
        setShowPopup={setShowPopup}
        setClaimableAmount={setClaimableAmount}
        setIsRedeemed={setIsRedeemed}
        setExpire={setExpire}
        setAirdropInfo={setAirdropInfo}
        setAirdropSigner={setAirdropSigner}
      />
      <MobileWallet />
      <Popup title="Claim Airdrop" open={open} setOpen={setOpen} onClose={closeModal}>
        <p className="text-sm text-gray-500">
          Allocations of $SWEEP are airdropped to rugpull victims and community contributers. Continue on to check if
          your address is available to earn $SWEEP.
        </p>
      </Popup>
      <ClaimAirdropPopup
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
