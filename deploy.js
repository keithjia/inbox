const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
//const {abi, evm} = require("./compile");
const contracts = require("./compile");
const util = require("util");

const gorliNetwork = "https://goerli.infura.io/v3/ba39c821796547c3a391077c22151360";

const truffleWalletProvider = new HDWalletProvider(
    "prevent rather country arch adapt insect anxiety curtain lobster just rug solve",
    gorliNetwork
);

const web3 = new Web3(truffleWalletProvider);

(async() => {
    accounts = await web3.eth.getAccounts();
    console.log(accounts); 
    const testFromAccount = accounts[0];

    console.log(`contract being deployed from: ${testFromAccount}`);

    await deployContract(["first real contract."], contracts["Inbox.sol"].Inbox, testFromAccount);
    await deployContract(null, contracts["Lottery.sol"].Lottery, testFromAccount);  

    // deployedInboxContract = await new web3.eth.Contract(abi)
    // .deploy({
    //     data: evm.bytecode.object, 
    //     arguments:["first real contract."]})
    // .send({
    //     from: testFromAccount, 
    //     gas:1000000});

    //     console.log(`contract deployed to: ${deployedInboxContract.options.address}`);

    truffleWalletProvider.engine.stop();
})();

async function deployContract(arguments, contract, from) {
    // creates the contract, send() issues the trasaction and 
    // executes the deployment
    deployedInboxContract = await new web3.eth.Contract(contract.abi)
    .deploy({
        data: contract.evm.bytecode.object, 
        arguments: arguments})
    .send({
        from: from, 
        gas:1000000});

    console.log(util.inspect(contract.abi, {showHidden: false, depth: null, colors: true}))
    console.log(`contract deployed to: ${deployedInboxContract.options.address}`);
}
