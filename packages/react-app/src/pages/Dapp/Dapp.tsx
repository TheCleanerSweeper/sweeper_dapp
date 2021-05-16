import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Route, Switch } from 'react-router-dom';
import { addresses, abis } from '@project/contracts';
import { MenuIcon, XIcon, GiftIcon, HomeIcon } from '@heroicons/react/outline';
import styled from 'styled-components';
import EthIcon from 'eth-icon';
import { ethers } from 'ethers';

import useWeb3Modal from '../../hooks/useWeb3Modal';
import logo from '../../images/logo.svg';
import Claim from '../../components/Dapp/Claim';
import Dashboard from '../../components/Dapp/Dashboard';
import Popup from '../../components/Dapp/Popup';

import { shortenAddress } from '../../utils/index';

const navigation = [
  { name: 'Dashboard', href: '#/app/dashboard', icon: HomeIcon, current: true },
  { name: 'Claim', href: '#/app/claim', icon: GiftIcon, current: false },
  // {
  //   name: "Swap",
  //   href: "#/app/burn",
  //   icon: SwitchHorizontalIcon,
  //   current: false,
  // },
  // {
  //   name: "$SWEEP",
  //   href: "#/app/burn",
  //   icon: LightningBoltIcon,
  //   current: false,
  // },
];

function classNames(...classes): string {
  return classes.filter(Boolean).join(' ');
}

const AddressBox = styled.div`
  padding-top: 10%;
  padding-bottom: 10%;
  padding-right: 10%;
  padding-left: 10%;
  &: hover {
    background-color: #374151;
    cursor: pointer;
  }
`;

const Dapp: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [sweeperBalance, setSweeperBalance] = useState('');
  const [sweeperContract, setsweeperContract] = useState<ethers.Contract>();
  const [correctChain, setCorrectChain] = useState(false);

  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  async function addEthereum(): Promise<void> {
    loadWeb3Modal();
    if (!provider) {
      return;
    }
    const network = await provider.getNetwork();
    if (network.chainId !== 56 && network.chainId !== 5) {
      setCorrectChain(true);
      return;
    }
    // The Metamask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const snr = provider.getSigner();
    setSigner(snr);

    const addr = await snr.getAddress();
    setAddress(addr);
  }

  const getSweepBalance = async (pvd: ethers.providers.Web3Provider, addr: string): Promise<void> => {
    if (!pvd) return;

    const contractAddress = addresses.sweeperdaoBSCMainnet;
    const abi = abis.sweeperdao;
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const balance = await contract.balanceOf(addr);
    const formattedBalance = ethers.utils.formatUnits(balance.toString(), 18);
    setSweeperBalance(formattedBalance);
    setsweeperContract(contract);
  };

  useEffect(() => {
    if (address) {
      getSweepBalance(provider, address);
    }
  }, [provider, address]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {correctChain ? (
        <Popup title="Incorrect Chain" open={correctChain} setOpen={setCorrectChain}>
          <p className="text-sm text-gray-500">
            The wallet you are using is not connected to the correct chain. To connect your wallet to Binance smart
            chain, please see this guide for metamask.
            <a
              href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain
            </a>
          </p>
        </Popup>
      ) : null}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <a href="/" className="flex">
                    <img className="h-10 w-auto" src={logo} alt="" />
                    <div className="w-auto flex items-center justify-center pl-4 text-xl text-white">SweeperDAO</div>
                  </a>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                          'mr-4 h-6 w-6',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <a
                  href={`https://bscscan.com/address/${address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 group block"
                >
                  <div className="flex items-center">
                    <div>
                      <EthIcon
                        className="inline-block h-9 w-9 rounded-full"
                        // Address to draw
                        address={address}
                        // scale * 8 pixel image size
                        scale={16}
                        // <img> props
                        style={{
                          background: 'red',
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{address ? shortenAddress(address) : 'None Set'}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <a href="/" className="flex">
                  <img className="h-10 w-auto" src={logo} alt="" />
                  <div className="w-auto flex items-center justify-center pl-4 text-xl text-white">SweeperDAO</div>
                </a>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-800 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 h-6 w-6',
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <AddressBox className=" bg-gray-800 p-4" onClick={() => addEthereum()}>
              <div className="flex items-center">
                <div>
                  <EthIcon
                    className="inline-block h-9 w-9 rounded-full"
                    // Address to draw
                    address={address}
                    // scale * 8 pixel image size
                    scale={16}
                    // <img> props
                    style={{
                      background: 'red',
                    }}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">{address ? shortenAddress(address) : 'None Set'}</p>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                    {!address ? 'Connect Wallet' : null}
                  </p>
                </div>
              </div>
              <div className="flex mt-5 items-center justify-center">
                <p className="text-xs font-medium text-white">
                  {sweeperBalance ? `${sweeperBalance} $SWEEP 🧹` : null}
                </p>
              </div>
            </AddressBox>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md
             text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none
        bg-gradient-to-br  from-gray-700 via-gray-600 to-gray-700"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-2">
              <Switch>
                <Route
                  path="/app/dashboard"
                  render={(props) => (
                    <Dashboard sweeperContract={sweeperContract} provider={provider} addEthereum={addEthereum} />
                  )}
                />
                <Route
                  exact
                  path="/app/claim"
                  render={(props) => (
                    <Claim
                      address={address}
                      addEthereum={addEthereum}
                      provider={provider}
                      signer={signer}
                      sweeperBalance={sweeperBalance}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dapp;
