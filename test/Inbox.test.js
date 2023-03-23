const assert  = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider(), null, { transactionConfirmationBlocks: 1 });

const {abi, evm} = require("../compile")["Inbox.sol"].Inbox;

let accounts;
let deployedInboxContract;
const initialMsg = "keith";

before(async () => {
    accounts = await web3.eth.getAccounts();

    // creates the contract, send() issues the trasaction and 
    // executes the deployment
    deployedInboxContract = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object, 
            arguments:[initialMsg]})
        .send({
            from: accounts[0], 
            gas:1000000});
});

describe("Inbox", ()=> {
    it ("should deploy contracts", () => {
        console.log(`deployed to ${deployedInboxContract.options.address}`);
        assert.ok(deployedInboxContract.options.address);
    });

    it ("should have been deployed with initial val", async ()=> {    
        const message = await deployedInboxContract.methods.message().call();
        assert.equal(initialMsg, message);
    });

    it ("should update to new", async()=> {
        const newMsg = "keith is awesome";
        await deployedInboxContract.methods.setMessage(newMsg).send({
            from: accounts[0],
            gas: 1000000
        });

        const retrievedMsg = await deployedInboxContract.methods.message().call();
        assert.equal(newMsg, retrievedMsg);
    });
});