import { ethers } from "ethers";
import { useState, useEffect } from "react";

const getData = async (
  sweeperContract,
  provider,
  setsupplyInfo,
  setburnInfo
) => {
  const totalSupply = await sweeperContract.totalSupply();
  const ts = ethers.utils.formatEther(totalSupply);
  const fixedTS = Number(ts).toFixed(3);
  const nice = ethers.utils.commify(fixedTS);
  setsupplyInfo(nice);

  const lastTransfer = await sweeperContract.lastTransfer();
  const adjuster = await sweeperContract.ADJUSTER();
  const latestHeight = await provider.getBlockNumber();
  const latestBlock = await provider.getBlock(latestHeight);
  const timeDifference = ethers.BigNumber.from(latestBlock.timestamp).sub(
    lastTransfer
  );
  const difference = ethers.BigNumber.from(timeDifference).div(
    ethers.BigNumber.from(adjuster)
  );

  const lowerFee = await sweeperContract.LOWER_FEE();
  const upperFee = await sweeperContract.UPPER_FEE();

  let fee = lowerFee.add(difference);
  if (fee.toNumber() > upperFee.toNumber()) {
    setburnInfo(upperFee.toNumber());
  } else {
    setburnInfo(fee.toNumber() - 100);
  }
};

export default function Dashboard(props) {
  const [supplyInfo, setsupplyInfo] = useState();
  const [burnInfo, setburnInfo] = useState();

  useEffect(() => {
    if (props.sweeperContract) {
      getData(
        props.sweeperContract,
        props.provider,
        setsupplyInfo,
        setburnInfo
      );
    }
  }, [props.sweeperContract, props.provider]);

  return (
    <>
      <div className="mt-10 overflow-hidden shadow rounded-lg divide-y divide-gray-200 justify-center text-center text-3xl bg-gray-200">
        <div className="px-4 py-3 sm:px-6 bg-gray-800 text-white">
          📊 Dashboard 📊
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {props.sweeperContract ? (
          <>
            <div className="flex-auto mr-3 mt-10 overflow-hidden shadow rounded-lg divide-y divide-gray-200 justify-center text-center text-3xl bg-gray-200">
              <div className="block h-full px-4 py-3 sm:px-6 bg-gray-800 text-white">
                <h4> Total Supply: </h4>
                {supplyInfo}
              </div>
            </div>
            <div className="flex-auto ml-3 mt-10 overflow-hidden shadow rounded-lg divide-y divide-gray-200 justify-center text-center text-3xl bg-gray-200">
              <div className="block h-full px-4 py-3 sm:px-6 bg-gray-800 text-white">
                <h4> Burn: </h4>
                {burnInfo ? `${burnInfo}%` : ""}
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
                Connect wallet to see stats
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
