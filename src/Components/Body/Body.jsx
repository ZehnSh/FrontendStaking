import { useEffect, useState } from "react";
import "./Body.css";
const { ethers } = require("ethers");

function Body({ state, account }) {
  const [balance, setBalance] = useState(null);
  const [stakedBalance, setStakedBalance] = useState(null);

  const { contract } = state;
  const mint = async (e) => {
    e.preventDefault();

    const amount = document.getElementById("mintAmount").value;
    try {
      const transaction = await contract.mint(amount);
      transaction.wait();
      console.log(transaction);
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async () => {
    const balance = await contract.balanceOf(account[0]);
    setBalance(ethers.utils.formatEther(balance));
  };

  const getStakedAmount = async () => {
    const stakedBalance = await contract.staker(account[0]);
    setStakedBalance(ethers.utils.formatEther(stakedBalance[0]));
  };

  const getRewardsAmount = async () => {
    const rewardsAmount = await contract.rewards(account[0]);
    console.log(ethers.utils.formatEther(rewardsAmount[0]));
  };

  const stake = async (e) => {
    e.preventDefault();
    const amount = document.getElementById("stakeAmount").value;
    try {
      const transaction = await contract.stake(amount);
      transaction.wait();
    } catch (err) {
      console.log(err);
    }
  };

  const unstake = async () => {
    try {
      const transaction = await contract.unStake();
      transaction.wait();
    } catch (err) {
      console.log(err);
    }
  };

  const claim = async () => {
    try {
      const transaction = await contract.claim();
      transaction.wait();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="getBalanceDiv">
        <button onClick={getBalance}>Get Token Balance</button>
        <p>Token Balance: {balance}</p>
      </div>
      <div className="getStakedAmountDiv">
        <button onClick={getStakedAmount}>Get Staked Token Balance</button>
        <p>Staked Token Balance: {stakedBalance}</p>
      </div>
      <form onSubmit={mint}>
        <label htmlFor="mintAmount">Mint Amount</label>
        <input
          type="number"
          id="mintAmount"
          placeholder="Token Amount To Mint"
        />
        <button type="submit">Mint</button>
      </form>
      <form onSubmit={stake}>
        <label htmlFor="stakeAmount">Stake Amount</label>
        <input
          type="number"
          id="stakeAmount"
          placeholder="Token Amount To Stake"
        />
        <button type="submit">Stake</button>
      </form>
      <p>After staking please wait for 1 minute to Unstake</p>
      <button onClick={unstake}>Unstake</button>

      <p>The Reward you will get approx 1 token every minute ie 60 seconds</p>

      <button onClick={claim}>Claim</button>
    </div>
  );
}

export default Body;
