import { useCallback, useEffect, useState, useMemo } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = 'INVALID_INFURA_KEY';

const RPC = {
  1: 'https://bsc-dataseed.binance.org/',
  2: 'https://bsc-dataseed1.defibit.io/',
  3: 'https://bsc-dataseed1.ninicoin.io/',
  4: 'https://bsc-dataseed2.defibit.io/',
  5: 'https://bsc-dataseed3.defibit.io/',
  6: 'https://bsc-dataseed4.defibit.io/',
  7: 'https://bsc-dataseed2.ninicoin.io/',
  8: 'https://bsc-dataseed3.ninicoin.io/',
  9: 'https://bsc-dataseed4.ninicoin.io/',
  10: 'https://bsc-dataseed1.binance.org/',
  11: 'https://bsc-dataseed2.binance.org/',
  12: 'https://bsc-dataseed3.binance.org/',
  13: 'https://bsc-dataseed4.binance.org/',
};

function useWeb3Modal(config: any = {}): [Web3Provider, () => Promise<void>, () => Promise<void>] {
  const [provider, setProvider] = useState<Web3Provider>();
  const [autoLoaded, setAutoLoaded] = useState<boolean>(false);
  const { autoLoad = true } = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = useMemo(
    () =>
      /* eslint-disable implicit-arrow-linebreak */
      new Web3Modal({
        /* eslint-enable implicit-arrow-linebreak */
        // network: NETWORK,
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              RPC,
            },
          },
        },
      }),
    [],
  );

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    window.location.reload();
  }, [web3Modal]);

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;
