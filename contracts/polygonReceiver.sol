//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IOffsetHelper} from "./interfaces/IOffsetHelper.sol";


contract pKarbRedeemer is Ownable {
    address public toucanAddress = 0x4E01404D07c5C85D35a2b6A6Ad777D29CC51Eaa1;
    address public BCTAddress = 0x2F800Db0fdb5223b3C3f354886d907A671414A7F;
    address public NCTAddress = 0xD838290e877E0188a4A44700463419ED96c16107;
    address public USDCAddress = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    IOffsetHelper public toucanOffsetAddress;

    constructor(address _toucan) {
        toucanOffsetAddress = IOffsetHelper(payable(address(_toucan)));
    }

    event BCTRedeemed(address indexed _from, uint256 _value);
    event NCTRedeemed(address indexed _from, uint256 _value);

    function redeemBCT(uint256 _amount, address _from) public payable {
        require(_amount>0,"Not enough BCT");
        IERC20 token = IERC20(BCTAddress);
        token.transferFrom(msg.sender, address(this), _amount);
        __approve(BCTAddress, toucanAddress, _amount);
        toucanOffsetAddress.autoOffsetPoolToken(BCTAddress, _amount);
        emit BCTRedeemed(_from, _amount);
    }

    function buyAndRedeemNCT(uint256 _amount, address _from) public payable {
        require(_amount>0,"Not enough USDC");
        IERC20 token = IERC20(USDCAddress);
        token.transferFrom(msg.sender, address(this), _amount);
        __approve(NCTAddress, toucanAddress, _amount);
        toucanOffsetAddress.autoOffsetExactInToken(USDCAddress, _amount, NCTAddress);
        emit NCTRedeemed(_from, _amount);
    }

    function deposit(uint256 _amount, address _token)  external payable {
        IERC20 token = IERC20(_token);
        token.transferFrom(msg.sender, address(this), _amount);
    }

    function withdraw (address _token, uint256 _amount) public payable onlyOwner {
        address payable payable_addr = payable(msg.sender);
        if (_token == address(0x0)) {
            payable_addr.transfer(_amount);
            return;
        }
        IERC20 token = IERC20(_token);
        token.transfer(msg.sender, _amount);
    }

    function __approve(address tokenAddress, address spender, uint256 amount) private {
        if (IERC20(tokenAddress).allowance(address(this), spender) < amount) {
            // Not a security issue since the contract doesn't store tokens
            IERC20(tokenAddress).approve(spender, type(uint256).max);
        }
    }

}

