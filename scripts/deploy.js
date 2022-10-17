const hre = require("hardhat");
async function main() {
  
    // We get the contract to deploy
    const BuyMeACoffe = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buymeacoffee = await BuyMeACoffe.deploy();
  
    await buymeacoffee.deployed();
  
    console.log("buymeacoffee deployed to:", buymeacoffee.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
