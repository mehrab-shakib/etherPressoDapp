import abi from "./contracts/coffee.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import cofe from "./etherpresso.png"; 
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x3875b99350dd066dca9a56f6afbaae6b3740afa9";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (
    <div style={{ 
      height: "100vh",
    margin: 0,
    padding: 0,
    backgroundImage: "linear-gradient(0deg, rgba(6,3,64,1) 0%, rgba(14,9,121,1) 34%, rgba(252,0,255,1) 100%)",
    overflow: "hidden", // Prevent scrolling on the body
    }}>
    <div style={{ 
      height: "100%",
      overflowY: "auto", // Enable scrolling for the content
    }}>
      <img src={cofe} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead text-white"
        style={{ marginTop: "10px", marginLeft: "5px"}}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
    </div>
  );
}

export default App;