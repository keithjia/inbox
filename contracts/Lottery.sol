// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    // someone who is allowed to trigger drawing of a winner
    address public manager;
    address[] public players;
    //mapping(address => uint) private players;

    constructor() {
        manager = msg.sender;
    }

    // enter into lottary
    function enter() external payable {
        // ether unit converts it to number of wei
        //uint ticketPrice = 0.001 ether;
        uint ticketPrice = 100;


        // must have sent sufficient ticket price
        require(msg.value == ticketPrice);

        //add to player pool
        players.push(msg.sender);
    }

    function pickWinner() external restrictedToManager {
        // only manager can call this function
        require(msg.sender == manager);

        // at least 1 participant to have a winnder
        require(players.length > 0);

        address winner = randomizePool();

        payable(winner).transfer(address(this).balance);

        reset();
    }

    modifier restrictedToManager() {
        require(msg.sender == manager);
        _;
    }

    function reset() private {
        //empty whole list is expensive
        players = new address[](0);
    }
    
    function randomizePool() public view returns (address){
        uint ind = uint(keccak256(
            abi.encodePacked(block.difficulty, block.timestamp, players))) % players.length; 
        // how to pick random number? need to call Chainlink
        return players[ind];
    }

    function getTotalPrizePool() external view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() external view returns ( address[] memory){
        return players;
    }
}