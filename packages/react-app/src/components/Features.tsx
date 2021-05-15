import React from 'react';
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline';

const features = [
  {
    name: 'Burn Rug Pulled Tokens',
    description: 'SweeperDAO will burn tokens that have been rugged pull and mint new $SWEEP tokens in return.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Airdrop',
    description:
      'Over 50% of the initial token supply will be airdropped to wallets that have been affected by a rug pull.',
    icon: ScaleIcon,
  },
  {
    name: 'Deflationary',
    description:
      'SweeperDAO will mint new tokens while burning shitcoins, to avoid a ever increasing supply there is a burning mechanesim. The mechanism is designed to either mint or burn tokens depending on useage of the token. If the token is being used heavily, users will need to burn a small portion of the tokens in order to complete the transaction.',
    icon: LightningBoltIcon,
  },
  {
    name: 'Vote on New Tokens',
    description: 'By holding $SWEEP, you can vote for the next rug pull the SweeperDAO should burn.',
    icon: AnnotationIcon,
  },
  {
    name: 'Owned and Goverened by the Community',
    description:
      'The token holders have complete control over the protocol and the treasury. The community can vote to decrease the burn rate, to burn a new token or to use the funds allocated to the treasury.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Treasury',
    description: 'Close to 40% of the initial token supply will be sent to the treasury to be used by the community.',
    icon: GlobeAltIcon,
  },
];

const Features: React.FunctionComponent = () => (
  <div className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Sweeping</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A better way to protect against scam tokens
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          SweeperDAO is community owned and governed. $SWEEP holders vote on which tokens can be burned.
        </p>
      </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {features.map((feature) => (
            <div key={feature.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
);

export default Features;
