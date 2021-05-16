import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  CurrencyYenIcon,
  FireIcon,
  SunIcon,
} from "@heroicons/react/outline";
import CountUp from "react-countup";

const getData = async (provider) => {};

export default function Geyser(props) {
  useEffect(() => {}, [props.geyserContract, props.provider]);

  return (
    <>
      <div className="mt-10 overflow-hidden shadow rounded-lg divide-y divide-gray-200 justify-center text-center text-3xl">
        <div className="px-4 py-3 sm:px-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white flex justify-center">
          <SunIcon className="w-8 mr-4 text-indigo-400" />
          Geyser
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {props.geyserContract ? (
          <>
            <div className="flex-auto w-3 h-52 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Asset
              </div>
              <div className="text-white mt-4">
                {/* TODO: get from contract */}
                <span className="text-indigo-400 text-xl">BNB-SWEEP</span>
              </div>
              <div className="">
                {/* TODO: get from contract */}
                <span className="text-indigo-400 text-xl">PancakeSwap</span>
              </div>
            </div>

            <div className="flex-auto w-3 h-50 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                APY:
              </div>
              <div className="text-white mt-4 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," duration={1} end={17} />%
                </span>
                <span className="text-indigo-400 ml-1">(1y)</span>
              </div>
            </div>

            <div className="flex-auto w-3 h-50 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <CurrencyYenIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                TVL:
              </div>
              <div className="text-white mt-4 text-xl">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  $<CountUp separator="," duration={1} end={170000} />
                </span>
              </div>
              <div className="text-white mt-4 text-xl">
                <CountUp separator="," duration={1} end={170000} />
                <span className="text-indigo-400 ml-1">SWEEP-BNB</span>
              </div>
            </div>

            <div className="flex-auto w-5 h-50 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <FireIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Position:
              </div>
              <div className=" mt-4 text-xl text-white">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  $<CountUp separator="," duration={1} end={170000} />
                </span>
              </div>
              <div className=" mt-4 text-xl text-white">
                <span className="border border-transparent rounded p-2 bg-gray-700">
                  <CountUp separator="," duration={1} end={170000} /> BNB-SWEEP
                </span>
              </div>
            </div>

            <div className="flex-auto w-5 h-50 mr-3 mt-10 overflow-hidden shadow rounded-lg  justify-center text-center text-3xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 ">
              <div className="py-3 sm:px-6 bg-gray-900 text-white flex justify-center">
                <FireIcon className="w-8 align-top flex text-indigo-400 mr-1" />
                Earnings:
              </div>
              <div className=" mt-4">
                <span className="border border-transparent rounded p-2 bg-gray-700 text-xl">
                  <CountUp separator="," duration={1} end={170000} /> BNB-SWEEP
                </span>
              </div>
              <div className=" mt-4 text-xl text-white">
                <span className="border border-transparent rounded p-2 bg-gray-700 text-xl">
                  $<CountUp separator="," duration={1} end={170000} />
                </span>
              </div>
            </div>

            <div className="flex-auto w-5 h-50 mr-3 mt-10 overflow-hidden  rounded-lg  justify-center text-center text-3xl ">
              <div className=" mt-12 text-xl text-white">
                <span className="border border-indigo-300 rounded p-5  text-xl">
                  Add Position
                </span>
              </div>
              <div className=" mt-12 text-xl text-white">
                <span className="border border-indigo-300 rounded p-5  text-xl">
                  Remove Position
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="mr-3 mt-10 overflow-hidden divide-y justify-center text-center text-3xl">
            <div className="h-full px-4 py-3 sm:px-6 text-white">
              <button
                onClick={() => props.addEthereum()}
                type="button"
                className=" inline-flex ml-4 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Connect wallet
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
