const { ethers } = require("ethers");
const abi = require("./abi.json");
const bytecode = "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100d9565b60405180910390f35b610073600480360381019061006e919061009d565b61007e565b005b60008054905090565b8060008190555050565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea26469706673582212203a9a252bb554698858b67bd3fc27faee97b772927e581cdf7138791134368bf564736f6c63430008070033";

// console.log(ethers); // Check if you downloaded ethers successfully.

async function main() {
  // 1. Connect to Ethereum via WebSocketProvider

  // Use your own infura api key here.
  // I'm using websocket but you can use the json rpc provider. Don't forget to change the rpc provider below as well.
  let url = "wss://ropsten.infura.io/ws/v3/c6affdcdfdd84d5abd95dbe6b293703d";
  let provider = new ethers.providers.WebSocketProvider(url);
  // console.log(await provider.getBlockNumber());
  // process.exit(0);

  // 2. Create a wallet (signer) and connect to provider
  // DO NOT EXPOSE YOUR PRIVATE KEYS LIKE THIS!
  // THERE ARE BOTS WHO ARE CRAWLING GITHUB REPOS AND THEY REACT REALLY FAST.
  let pk = "0x4287fd2943090efe793409e2cbd79bda2430fa257dd657f33b03bb5b9509de76";
  let wallet = new ethers.Wallet(pk);
  // console.log(wallet.address);

  wallet = wallet.connect(provider);

  // 3. Get some ropsten eth

  // 4.  Deploy a contract (storage example on remix)
  // 4a. Save the storage contract here as storage.sol
  // 4b. Get the ABI and bytecode either from remix or programmatically
  // 4c. npx solc help
  // 4d. npx solc --abi --bin --base-path . ./storage.sol
  // 4e. Compare ABI & bytecode generated by solc vs by remix
  // 4f. Rename the file to abi.json
  // 4g. Copy bytecode and store as variable (the proper way is more complex so let's just make do w/ this for now)
  // 4g. Import into the script (see on top)

  // 5. Check our ropsten balance
  let balance = await provider.getBalance(wallet.address);
  // console.log(balance); // Will return bignumber, explain the use of bignumber.
  // console.log(ethers.utils.formatEther(balance));

  // 6. Create contract factory
  console.log("Creating factory");
  let factory = new ethers.ContractFactory(abi, bytecode, wallet);

  // 7. Deploy an instance of the contract
  console.log("Deploying contract")
  let contract = await factory.deploy();
  let tx = contract.deployTransaction; 
  tx.wait() // defaults to 1 block
  .then(async (receipt) => {
    console.log("Transaction hash:", receipt);
    process.exit(0);
    // When done, uncomment the bottom steps and comment out steps 6 and 7.
  })


  // // 8. Use address to get an instance of the contract
  // let address = "0x50Fc39Dd3eede305ca427e6c3C17dA1D9e0bDE3a";
  // let contract = new ethers.Contract(address, abi, wallet);

  // // 9. Call the value on the deployed smart contract (defaults to 0);
  // console.log("Retrieve value in contract");
  // let val = await contract.retrieve();
  // console.log(val);             // this is a bn
  // console.log(val.toString());  // this is a string

  // // 10. Set a value on the deployed smart contract
  // console.log("Setting value in contract");
  // let tx = await contract.store(42);
  // tx.wait()
  // .then(async (receipt) => {
  //   console.log("Transaction hash:", receipt);

  //   // 11. Call the value on the deployed smart contract, do not put this outside or it'll be called asynchronously
  //   console.log("Retrieve value in contract again");
  //   val = await contract.retrieve();
  //   console.log(val);             // this is a bn
  //   console.log(val.toString());  // this is a string
  //   process.exit(0);
  // })

  // // 12. Check the data on etherscan.

  // // 13. If there is time, do another example for mainnet ERC20 tokens
}

main();