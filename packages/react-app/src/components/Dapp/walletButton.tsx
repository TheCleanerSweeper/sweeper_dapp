import React from 'react';
import styled from 'styled-components';

interface WalletButtonProps {
  provider: any;
  loadWeb3Modal: () => Promise<void>;
  logoutOfWeb3Modal: () => Promise<void>;
}

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

const WalletButton: React.FC<WalletButtonProps> = ({ provider, loadWeb3Modal, logoutOfWeb3Modal }) => (
  <Button
    onClick={() => {
      if (!provider) {
        loadWeb3Modal();
      } else {
        logoutOfWeb3Modal();
      }
    }}
  >
    {!provider ? 'Connect Wallet' : 'Disconnect Wallet'}
  </Button>
);

export default WalletButton;
