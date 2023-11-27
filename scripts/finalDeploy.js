const hre = require("hardhat");

async function main() {
    const cofffee = await hre.ethers.getContractFactory("coffee");
    const contract = await cofffee.deploy(); //instance of contract
  
    await contract.waitForDeployment()
    console.log("Address of contract:", contract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });