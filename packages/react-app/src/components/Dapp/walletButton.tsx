import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import { injected, network } from '../../connectors';

enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  // WalletConnect = 'WalletConnect',
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
  // [ConnectorNames.WalletConnect]: walletconnect
};

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

const WalletButton: React.FC = () => {
  const [activatingConnector, setActivatingConnector] = useState<any>();
  const [loggedIn, setloggedIn] = useState<boolean>(false);

  const context = useWeb3React<Web3Provider>();
  const { connector, activate, deactivate, active, error } = context;

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
    <Button
      onClick={() => {
        if (!active) {
          setActivatingConnector(injected);
          activate(injected);
          setloggedIn(true);
        } else {
          deactivate();
          setloggedIn(false);
        }
      }}
    >
      {!active ? 'Connect Wallet' : 'Disconnect Wallet'}
    </Button>
  );
};

export default WalletButton;
