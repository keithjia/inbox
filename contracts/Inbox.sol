pragma solidity ^0.8.19;

contract Inbox {
    string public message;

    Constructor Inbox(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string calldata newMessage) public {
        message = newMessage;
    }
}

