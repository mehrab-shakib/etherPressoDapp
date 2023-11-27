import { ethers } from "ethers";
import "./Buy.css"
const Buy = ({ state }) => {
  const buyCoffee = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.parseEther("0.001") }; //should i still use utils??? 
    const transaction = await contract.buyCoffee(name, message, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };
  return (
    <div className="center">
    <h1>Ether_Presso</h1>
     <form onSubmit={buyCoffee}>
       <div className="inputbox">
         <input type="text" required="required" id="name" />
         <span>Name</span>
       </div>
       <div className="inputbox">
         <input type="text" required="required" id="message" />
         <span>Message</span>
       </div>
       <div className="inputbox">
         <input type="submit" value="Pay"  disabled={!state.contract}/>
       </div>
     </form>
       
     </div>
  );
};
export default Buy;