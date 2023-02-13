const ethers = require("ethers");
const fs = require("fs");
require('dotenv').config({path : ".env"});

const deployStorage = async () =>{

    console.log(process.env.RPC_URL);
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);

    const ABI = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8");
    const BINARY = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8");

    const contractFactory = new ethers.ContractFactory(ABI,BINARY,wallet);

    console.log("Deploying Contract");

    const contract = await contractFactory.deploy();
    const deploymentReceipt = await contract.deployTransaction.wait(1);

    console.log(`Contract deployed to ${contract.address}`);
    let transactionResponse = await contract.store(1)
    let transactionReceipt = await transactionResponse.wait();
    let currentFavoriteNumber = await contract.retrieve()
    console.log(`Current Favorite Number: ${currentFavoriteNumber}`)
    console.log("Updating favorite number...")
    transactionResponse = await contract.store(7)
    transactionReceipt = await transactionResponse.wait()
    currentFavoriteNumber = await contract.retrieve()
    console.log(`New Favorite Number: ${currentFavoriteNumber}`)



}

deployStorage().then(()=>{
    console.log("Success");
    process.exit(0);
}).catch((e)=>{
    console.log(e);
    process.exit(1);
})