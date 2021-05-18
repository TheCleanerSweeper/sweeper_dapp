import React, { useState, useEffect, Fragement } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import config from './config';
import { WalletCard } from './WalletCard';
import { injected, network } from '../../../connectors';

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
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function closeModal(): void {
    setIsOpen(false);
  }

  function openModal(): void {
    setIsOpen(true);
  }

  const context = useWeb3React<Web3Provider>();
  const { connector, activate, deactivate, active, error } = context;

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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {config.map((entry, index) => (
                  <WalletCard
                    key={entry.title}
                    login={etActivatingConnector}
                    walletConfig={entry}
                    activate={activate}
                    onDismiss={closeModal}
                  />
                ))}
              </div>
              {/* // <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                //   Payment successful
                // </Dialog.Title>
                // <div className="mt-2">
                //   <p className="text-sm text-gray-500">
                //     Your payment has been successfully submitted. We’ve sent your an email with all of the details of
                //     your order.
                //   </p>
                // </div>

                // <div className="mt-4">
                //   <button */}
              {/* //     type="button"
                //     className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                //     onClick={closeModal}
                //   >
                //     Got it, thanks!
                //   </button>
                // </div> */}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ConnectModal;
