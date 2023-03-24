import web3 from "./web3";

// results from deploy.js after running deployment to gorlier network and abi is from compile
const address = "0x5aE22C78318f1AfD0CD44c19b1312d9D83e7f91b";
const abi = [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      payable: undefined,
      signature: 'constructor'
    },
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      constant: undefined,
      payable: true,
      signature: '0xe97dcb62'
    },
    {
      inputs: [],
      name: 'getPlayers',
      outputs: [ { internalType: 'address[]', name: '', type: 'address[]' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x8b5b9ccc'
    },
    {
      inputs: [],
      name: 'getTotalPrizePool',
      outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x160a48b9'
    },
    {
      inputs: [],
      name: 'manager',
      outputs: [ { internalType: 'address', name: '', type: 'address' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x481c6a75'
    },
    {
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
      constant: undefined,
      payable: undefined,
      signature: '0x5d495aea'
    },
    {
      inputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
      name: 'players',
      outputs: [ { internalType: 'address', name: '', type: 'address' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xf71d96cb'
    },
    {
      inputs: [],
      name: 'randomizePool',
      outputs: [ { internalType: 'address', name: '', type: 'address' } ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xd3e0c3b5'
    }
  ];

export default new web3.eth.Contract(abi, address);