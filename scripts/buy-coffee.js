
const hre = require("hardhat");

///////// Helper Functions /////////

async function getBalance(address) {
  const balanceBigInt= await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx=0;
  for(const address of addresses) {
    console.log(`balance of address ${idx} :` ,await getBalance(address));
    idx++;
  }
}

async function getMemos(memos) {
  for (const memo of memos){
    const tipper= memo.name;
    const timstamp=memo.timestamp;
    const tipperAddress=memo.from;
    const message=memo.message;

    console.log(`At ${timstamp} , ${tipper} (${tipperAddress}) Said : ${message}` );
  }
}

async function main() {
  
  // We get the contract to deploy
  const BuyMeACoffe = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buymeacoffee = await BuyMeACoffe.deploy();

  await buymeacoffee.deployed();

  console.log("buymeacoffee deployed to:", buymeacoffee.address);

  //get Sample Accounts
  const [owner,tipper1,tipper2,tipper3]=await hre.ethers.getSigners();

  // print Balances
  console.log("=== Start ===")
  const addresses=[owner.address,tipper1.address,tipper2.address,tipper3.address,buymeacoffee.address];
  await printBalances(addresses);

  console.log("=== Bought a Coffee ===")
  const tip={value: hre.ethers.utils.parseEther("1")}
  await buymeacoffee.connect(tipper1).buyCoffee("Osama" ,"1st Coffee",tip);
  await buymeacoffee.connect(tipper2).buyCoffee("Osama" ,"2nd Coffee",tip);
  await buymeacoffee.connect(tipper3).buyCoffee("Osama" ,"3rd Coffee",tip);

  console.log("=== Balances after bought a Coffee ===");
  await printBalances(addresses);

  console.log("=== get Memos ===");
  const memos=await buymeacoffee.connect(owner).getMemos();
  await getMemos(memos);

  console.log("=== withdraw Tips ===");
  await buymeacoffee.connect(owner).withdrawTip();

  console.log("=== Balances after withdraw Tips ===");
  await printBalances(addresses);


  



}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
