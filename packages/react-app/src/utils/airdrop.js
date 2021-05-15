import { ethers } from 'ethers';
import data from '../data.json';
import goerlidata from '../goerlidata.json';

export const getAirdropInfo = (address) => {
  // const fs = require("fs");
  let airdropData = data;

  // let airdropData = JSON.parse(rawdata);
  airdropData = airdropData[`${address}`];
  // airdropData = airdropData["0x949f435a2508f397c42b5b85993132de9600a3b9"];

  return airdropData;
};

export const getGoerliAirdropInfo = async (address) => {
  const fs = require('fs');

  const rawdata = fs.readFileSync('../data.json');
  const airdropData = JSON.parse(rawdata);
  return airdropData;
};

export const getClaimableAmount = (airdropInfo) => {
  let format = '0';
  if (airdropInfo) {
    const { amount } = airdropInfo;
    // const toDisplay = amount ? Number(amount) / Math.pow(10, 18) : "0";
    const toDisplay = amount || '0';
    format = toDisplay.toString();
  }
  // setClaimable(format);
  return format;
};

export const getAirdropContract = (contractAddress, abi, provider) => {
  const airdropContract = new ethers.Contract(contractAddress, abi, provider);
  return airdropContract;
};

// find out if they redeemed
export const redeemed = async (web3, index) => {
  const isRedeemed = await getAirdropContract(web3).redeemed(index);
  return isRedeemed;
};

// to redeem
export const redeem = async (web3, globalState, airdropData) => {
  const user = globalState.address;
  const contract = new web3.eth.Contract('abi', '0x6dc02fC80F070dAA5188ad410587E5502ddb3c63');

  if (globalState.provider && user) {
    const claim = await contract.methods
      .redeemPackage(airdropData.leaf.index, airdropData.leaf.address, airdropData.leaf.amount, airdropData.proof)
      .send({ from: user });
    // .on("transactionHash", (hash) => handleNotify(globalState.notify, hash));
    return claim;
  }
};
