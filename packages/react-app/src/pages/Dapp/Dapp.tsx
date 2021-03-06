import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Route, Switch } from 'react-router-dom';
import { addresses, abis } from '@project/contracts';
import { MenuIcon, XIcon, GiftIcon, HomeIcon } from '@heroicons/react/outline';
import EthIcon from 'eth-icon';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import logo from '../../images/logo.svg';
import Claim from '../../components/Dapp/Claim/Claim';
import Storm from '../../components/Dapp/storm/Storm';
import Popup from '../../components/Dapp/Popup';
import Dashboard from '../../components/Dapp/Dashboard';
import ConnectModal from '../../components/Dapp/WalletModal/ConnectModal';

import { shortenAddress, formatAmount } from '../../utils/index';
import { getErrorMessage } from '../../utils/error';
import { useInactiveListener } from '../../hooks/useInactiveListener';
import { useEagerConnect } from '../../hooks/useEagerConnect';

const navigation = [
  { name: 'Dashboard', href: '#/app/dashboard', icon: HomeIcon, current: true },
  { name: 'Claim', href: '#/app/claim', icon: GiftIcon, current: false },
  // { name: 'Rewards', href: '#/app/rewards', icon: SunIcon, current: false },
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

const Dapp: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [walletError, setWalletError] = useState(false);
  const [sweeperBalance, setSweeperBalance] = useState('');
  const [sweeperContract, setsweeperContract] = useState<ethers.Contract>();

  function closeModal(): void {
    setWalletError(false);
  }

  const { library, account, active, error } = useWeb3React<Web3Provider>();

  const triedEager = useEagerConnect();

  useInactiveListener(!triedEager);

  const getSweepBalance = async (pvd: ethers.providers.Web3Provider, addr: string): Promise<void> => {
    if (!pvd) return;

    const contractAddress = addresses.sweeperdaoBSCMainnet;
    const abi = abis.sweeperdao;
    const contract = new ethers.Contract(contractAddress, abi, pvd);
    const balance = await contract.balanceOf(addr);
    const nice = formatAmount(balance);

    setSweeperBalance(nice);
    setsweeperContract(contract);
  };

  useEffect(() => {
    if (library && account) {
      getSweepBalance(library, account);
    }
  }, [library, account]);

  // useEffect(() => {
  //   if (library) {

  //   }
  // }, [library]);

  useEffect(() => {
    if (error) {
      setWalletError(true);
    }
  }, [error]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {error ? (
        <Popup title="Error Connecting Wallet" open={walletError} setOpen={setWalletError} onClose={closeModal}>
          <p className="text-sm text-gray-500">{getErrorMessage(error)}</p>
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
              <div className="flex flex-wrap justify-center flex-shrink-0 bg-gray-700 p-4">
                {active ? (
                  <div className="flex items-center">
                    <div>
                      <EthIcon
                        className="inline-block h-9 w-9 rounded-full"
                        // Address to draw
                        address={account}
                        // scale * 8 pixel image size
                        scale={16}
                        // <img> props
                        style={{
                          background: 'red',
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{account ? shortenAddress(account) : 'None Set'}</p>
                    </div>
                  </div>
                ) : null}
                {active ? <ConnectModal /> : null}
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
                      'group flex items-center px-2 py-2 text-lg font-medium rounded-md',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-indigo-300' : 'text-indigo-400 group-hover:text-indigo-300',
                        'mr-3 h-6 w-6',
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="bg-gray-800 flex justify-center flex-wrap pb-6">
              {active ? (
                <div className="flex items-center">
                  <div>
                    <EthIcon
                      className="inline-block h-9 w-9 rounded-full"
                      // Address to draw
                      address={account}
                      // scale * 8 pixel image size
                      scale={16}
                      // <img> props
                      style={{
                        background: 'red',
                      }}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{account ? shortenAddress(account) : 'None Set'}</p>
                    <p className="text-xs font-medium text-white">
                      {sweeperBalance ? `${sweeperBalance} $SWEEP ????` : null}
                    </p>
                  </div>
                </div>
              ) : null}
              <ConnectModal />
            </div>
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
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-2">
              <Switch>
                <Route path="/app/dashboard" render={() => <Dashboard sweeperContract={sweeperContract} />} />
                <Route exact path="/app/claim" render={() => <Claim sweeperBalance={sweeperBalance} />} />
                <Route path="/app/rewards" component={Storm} />
              </Switch>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dapp;
