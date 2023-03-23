const assert  = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider(), null, { transactionConfirmationBlocks: 1 });

const {abi, evm} = require("../compile")["Lottery.sol"].Lottery;

// console.log(abi);
// console.log(evm);

let accounts;
let deployedLotteryContract;
// const initialMsg = "keith";
let manager;


before(async () => {
    accounts = await web3.eth.getAccounts();

    console.log(accounts);
    manager = accounts[0];

    // creates the contract, send() issues the trasaction and 
    // executes the deployment
    deployedLotteryContract = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object, 
            arguments:null})
        .send({
            from: manager, 
            gas:1000000});
});

describe("Lottery", ()=> {
    it ("should deploy contracts", () => {
        console.log(`deployed to ${deployedLotteryContract.options.address}`);
        assert.ok(deployedLotteryContract.options.address);
    });

    it ("should have been deployed from Manager account", async ()=> {    
        const managerAddress = await deployedLotteryContract.methods.manager().call();
        assert.equal(manager, managerAddress);
    });

    it ("should be able to enter lottery", async()=> {
        await enterLotteryPlayers(deployedLotteryContract, accounts, 3);

        let players = await deployedLotteryContract.methods.getPlayers().call();
        assert.equal(3, players.length);

        assert.equal(accounts[1], players[1]);

        let total = await deployedLotteryContract.methods.getTotalPrizePool().call();
        assert.equal(300, total);
    });

    it ("requires min value to enter", async()=> {
            try {
                await contract.methods.enter().send({
                    from: accounts[5],
                    gas: 1000000,
                    value: 1
                });
                assert.fail("should have failed due to insufficient tix price");
            }
            catch (e) {
                assert.ok(e);
            }
        }

    );
    it ("only manager is able to pick winner", async()=> {
        try {
            await deployedLotteryContract.methods.pickWinner().send({from: accounts[3]});
            assert.fail("should have failed due to non manager");
        }
        catch(e) {
            assert.ok("good");
        }       
    });

    it ("should be able to pick winner", async()=> {
        await deployedLotteryContract.methods.pickWinner().send({from: manager});
       
        console.log("waiting 2 sec");
        let total = await deployedLotteryContract.methods.getTotalPrizePool().call();
        assert.equal(0, total);

        let players = await deployedLotteryContract.methods.getPlayers().call();
        assert.equal(0, players.length);
    });
});

async function enterLotteryPlayers(contract, accounts, numOfPlayers) {
    for (let i=0; i< numOfPlayers; ++i) {
        await contract.methods.enter().send({
            from: accounts[i],
            gas: 1000000,
            value: 100
        });
    }
}