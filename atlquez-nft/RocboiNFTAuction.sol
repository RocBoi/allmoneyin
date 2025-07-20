// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RocBoiNFTAuction is ERC721URIStorage, Ownable {
    uint256 public auctionEndTime;
    address public highestBidder;
    uint256 public highestBid;
    bool public ended;
    mapping(address => uint256) public pendingReturns;

    uint256 public tokenId;

    constructor() ERC721("RocBoiNFT", "ROC") {
        tokenId = 1;
        string memory ipfsURI = "ipfs://bafybeigzgx6gvjnqw7xwxnvazddxdyoseolnjydkl7xon3t25vddgn6fcq";
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, ipfsURI);
        auctionEndTime = block.timestamp + 48 hours;
    }

    function bid() external payable {
        require(block.timestamp < auctionEndTime, "Auction already ended.");
        require(msg.value > highestBid, "There already is a higher or equal bid.");

        if (highestBid != 0) {
            // Refund the previous bidder
            pendingReturns[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function withdraw() external returns (bool) {
        uint256 amount = pendingReturns[msg.sender];
        require(amount > 0, "No funds to withdraw.");
        pendingReturns[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdraw failed.");
        return true;
    }

    function endAuction() external onlyOwner {
        require(block.timestamp >= auctionEndTime, "Auction not yet ended.");
        require(!ended, "Auction already ended.");

        ended = true;

        if (highestBidder != address(0)) {
            _transfer(owner(), highestBidder, tokenId);
        }

        payable(owner()).transfer(highestBid);
    }
}
