import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import Popup from '../Popup';
import config from './config';
import WalletCard from './WalletCard';

const Button = styled.button`
color: white;
--tw-bg-opacity: 1;
background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
border-radius: 2rem;
text-align: center;
vertical-align: middle;
cursor: pointer;
padding: 0.4375rem 1.5rem;
font-size: 1rem;
line-height: 1.5;
border-radius: 0.3125rem;
transition: all 0.2s ease-in-out;
margin-top: 1rem;
&: hover {
    transform: translate(10px)
    box-shadow: 0.5px 0.5px 15px #e6007a;
    --tw-text-opacity: 1;
    background-color: rgba(129, 140, 248, var(--tw-text-opacity));
    color: black;
}
`;

const ConnectModal: React.FC = () => {
  const [activatingConnector, setActivatingConnector] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function closeModal(): void {
    setIsOpen(false);
  }

  function openModal(): void {
    setIsOpen(true);
  }

  const context = useWeb3React<Web3Provider>();
  const { connector, activate, deactivate, active } = context;

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <>
      <Button
        onClick={() => {
          if (!active) {
            openModal();
          } else {
            deactivate();
          }
        }}
      >
        {!active ? 'Connect Wallet' : 'Disconnect Wallet'}
      </Button>
      <Popup title="Supported Wallets" open={isOpen} setOpen={openModal}>
        <div className="flex flex-row mt-8 mb-8 content-center  justify-between text-white">
          {config.map((entry, index) => (
            <WalletCard
              key={entry.title}
              login={setActivatingConnector}
              walletConfig={entry}
              activate={activate}
              onClose={closeModal}
            />
          ))}
        </div>
      </Popup>
    </>
  );
};

export default ConnectModal;
