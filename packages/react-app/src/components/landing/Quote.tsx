import React from 'react';
import logolight from '../../images/logo-light.svg';

const Quote: React.FunctionComponent = () => (
  <div className="bg-white pt-16 lg:py-24">
    <div className="pb-16 bg-indigo-600 lg:pb-0 lg:z-10 lg:relative">
      <div className="lg:mx-auto lg:max-w-8xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="relative lg:-my-8">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 bg-white lg:hidden" />
          <img className="object-cover lg:h-full lg:w-full" src={logolight} alt="" />
        </div>
        <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
            <blockquote>
              <div>
                <svg
                  className="h-12 w-12 text-white opacity-25"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="mt-6 text-2xl font-medium text-white">
                  Blockchains are riddled with shitcoins and rug pulls. Many people who first enter the blockchain space
                  want to make a quick return and end up entering into tokens, that they may believe to be good because
                  of the marketing. Many of these tokens are scams and the creators end up withdrawing all liquidity
                  from the market leaving the newcomers holding the bag. SweeperDAO is meant to help bring value to
                  these tokens by burning them in return for $SWEEP tokens. SweeperDAO will end up cleaning the
                  blockchains it is present on.
                </p>
              </div>
              <footer className="mt-6">
                <p className="text-base font-medium text-white">The Cleaner Sweeper</p>
                <p className="text-base font-medium text-indigo-100">Chief Cleansing Officer</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Quote;
