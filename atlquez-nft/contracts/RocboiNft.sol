// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RocBoiNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;

    constructor() ERC721("RocBoiNFT", "RBQNFT") {}

    function mint(string memory _tokenURI) public onlyOwner returns (uint256) {
        tokenCount += 1;
        _mint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
}
