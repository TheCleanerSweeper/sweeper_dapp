/* eslint-disable */
import { ethers } from 'ethers';
import data from '../data.json';
import goerlidata from '../goerlidata.json';

export type AirdropData = {
  amount: string;
  index: number;
  proof: [string];
};

export const getAirdropInfo = (address: string): AirdropData => {
  // const fs = require("fs");
  let airdropData = data;

  let airdrop = airdropData[address.toLowerCase()];

  return airdrop;
};

export const getGoerliAirdropInfo = async (address: string) => {
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
