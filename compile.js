const path = require("path");
const fs = require("fs");
const solc = require("solc");
const util = require('util')

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const sourceInbox = fs.readFileSync(inboxPath, "utf8");
 
const sourceLottery = fs.readFileSync(path.resolve(__dirname, "contracts", "Lottery.sol"), "utf8");

try {
    const input = {
        language: 'Solidity',
        sources: {
          'Inbox.sol': {
            content: sourceInbox,
          },
          'Lottery.sol': {
            content: sourceLottery,
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*']
            }
          }
        }
      };
      
    //compile contract
    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    
    //console.log( output.contracts);

    //module.exports = output.contracts["Inbox.sol"].Inbox;
    module.exports = output.contracts;
    //console.log(util.inspect(output, {showHidden: false, depth: null, colors: true}));

    // for (var contractName in output.contracts['Inbox.sol']) {
    //     console.log(
    //       contractName +
    //         ': ' +
    //         output.contracts['Inbox.sol'][contractName].evm.bytecode.object
    //     );
    //   }
} 
catch(e) {
    console.log(e);
}
