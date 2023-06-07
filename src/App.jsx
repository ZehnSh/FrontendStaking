import { useEffect, useState } from "react";
import "./App.css";
import Body from "./Components/Body/Body";
import Navbar from "./Components/Navbar/Navbar";
import abi from "./contract/abi.json";
import { ethers } from "ethers";



function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("");


  const connectWallet = async () => {
    const smartContractAddress = "0x2EBfb53D2f3cACc720D3f475E273f33637e533A8";
    const contractAbi = abi.abi;

    try {
      const { ethereum } = window;
      if(ethereum){
        const account = await ethereum.request({method:"eth_requestAccounts"});
        setAccount(account);
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contract = new ethers.Contract(smartContractAddress, contractAbi, signer);
      setState({provider, signer, contract});
    } catch(error) {
      console.log(error);
    
    }
  };

console.log(state);
  return (
    <>
      <Navbar></Navbar>
      <div style={{ display: "flex", justifyContent: "center" }}>
    <button className="button-connect" onClick={connectWallet}>
      {account ? account : <h4>Connect Wallet</h4>}
    </button>
  </div>
      {account ? <Body state={state} account={account}></Body> : <></>}
    </>
  );
}

export default App;
