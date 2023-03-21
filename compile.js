const path = require("path");
const fs = require("fs");
const solc = require("solc");
const util = require('util')


const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");


try {
    const input = {
        language: 'Solidity',
        sources: {
          'Inbox.sol': {
            content: source,
          },
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
    
    //console.log( output.contracts["Inbox.sol"].Inbox);

    module.exports = output.contracts["Inbox.sol"].Inbox;
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
