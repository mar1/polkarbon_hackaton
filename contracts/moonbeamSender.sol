//SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ISquidMulticall} from "./interfaces/ISquidMulticall.sol";
import {ISquidRouter} from "./interfaces/ISquidRouter.sol";
import {IUniswapV2Router} from "./interfaces/IUniswapV2Router.sol";
import {ParachainStaking} from "./interfaces/IStaking.sol";

contract polkarbon is ERC20Burnable, Ownable {
    ParachainStaking public stakingContract;
    ISquidRouter public squidRouterContract;
    ISquidMulticall public squidMulticallContract;
    IUniswapV2Router public stellaRouterContract;
    mapping(address => bool) public allowedTokens;
    address[] public collatorContracts;
    address public stellaRouter;
    
    constructor(
        address _squidRouter,
        address _squidMulticall,
        address _stellaRouter,
        address _collator,
        address _xcDot)
        ERC20("polkarbon", "pKarb") {
        squidRouterContract = ISquidRouter(_squidRouter);
        squidMulticallContract = ISquidMulticall(_squidMulticall);
        stellaRouterContract =  IUniswapV2Router(_stellaRouter);
        stellaRouter = _stellaRouter;
        stakingContract = ParachainStaking(0x0000000000000000000000000000000000000800);
        collatorContracts.push(_collator);
        allowedTokens[_xcDot] = true;
        _mint(msg.sender,100000000000000000000);
    }
    
    event stakingInitiated(address indexed _from, address _collator);
    event pKarbMinted(address indexed _from, uint256 _amount);
    event yieldRedeemed(address indexed _from, uint256 _amount);

    receive() external payable{
        //needed fct to receive native token
    } 

    function nativeMint(uint256 _amount, address _token, uint8 _collatorId) external payable returns (bool) {
        if (_token == address(0x0)) {
            //native mint with GLMR token: 1 pKarb equals 1 GLMR
            require(msg.value >= _amount, "Not enough GLMR");

             _stake(_collatorId, _amount); 

            _mint(msg.sender, _amount); 
            emit pKarbMinted(msg.sender, _amount);
            return true;
        }

        if (allowedTokens[_token] == true) {
            //mint with allowed ERC20 tokens including xc20s
            IERC20 token = IERC20(_token);
            uint256 amountToSwap = _amount;
            token.transferFrom(msg.sender, address(this), amountToSwap);
            __approve(_token, stellaRouter, amountToSwap);
            address[] memory path = new address[](2);
            path[0] = address(_token);
            path[1] = stellaRouterContract.WETH();
            uint256[] memory amounts = stellaRouterContract.getAmountsOut(amountToSwap, path);
            stellaRouterContract.swapExactTokensForETH(
                amountToSwap,
                0,
                path,
                address(this),
                block.timestamp
            );

            _stake(_collatorId, amounts[amounts.length - 1]); to uncomment

            _mint(msg.sender, amounts[amounts.length - 1]);
            emit pKarbMinted(msg.sender, amounts[amounts.length - 1]);
            return true;
        }
        else {
            return false;
        }
    }

    function sendYield(ISquidMulticall.Call[] calldata _sourceCalls, ISquidMulticall.Call[] calldata _destinationCalls, uint256 _value) external payable onlyOwner { 
        //cross-chain function sending GLMR staking yield to Polygon receiver SC    
        squidRouterContract.callBridgeCall{value: msg.value}(
        0x0000000000000000000000000000000000000000,
        _value,
        'Polygon',
        'axlUSDC',
        _sourceCalls,
        _destinationCalls,
        msg.sender,
        true
    );
    emit yieldRedeemed(msg.sender, _value);
    }

    function setConfig(uint8 _id, address _address) external onlyOwner {
        if (_id == 1) {
            //set up a new squid router contract
            squidRouterContract = ISquidRouter(_address);
        }
        if (_id == 2) {
            //set up a new squid multicall contract
            squidMulticallContract = ISquidMulticall(_address);
        }
        if (_id == 3) {
            //set up a new stella router contract
            stellaRouterContract =  IUniswapV2Router(_address);
            stellaRouter = _address;
        }
        if (_id == 4) {
            //add an allowed token for moonbeam source mint
            allowedTokens[_address] = true;
        }
        if (_id == 5) {
            //remove an allowed token for moonbeam source mint
            allowedTokens[_address] = false;
        }
        if (_id == 6) {
            //add a new collator to stake on
            collatorContracts.push(_address);
        }
    }

    function initiateStaking(uint8 _idCollator) public payable onlyOwner {
        //need to be called before tokens minting

        address collatorToDelegate = collatorContracts[_idCollator];
        require(stakingContract.isSelectedCandidate(collatorToDelegate), "Address not part of the active set");
        uint256 candidateCounter = stakingContract.candidateDelegationCount(collatorToDelegate);
        uint256 delegationCounter = stakingContract.delegatorDelegationCount(address(this));
        stakingContract.delegate(collatorToDelegate, msg.value, candidateCounter, delegationCounter);
    }

    function _stake(uint8 _idCollator, uint256 _amount) internal returns (bool) {
        require(msg.value > 0, "Not enough GLMR");
        require(msg.value >= _amount, "Not enough GLMR");
        stakingContract.delegatorBondMore(collatorContracts[_idCollator], _amount);
        return true;
    }

    function scheduleUnstake(uint8 _idCollator, uint256 _amount) external onlyOwner {
        stakingContract.scheduleDelegatorBondLess(collatorContracts[_idCollator], _amount);
    }

    function executeUnstake(uint8 _idCollator) external onlyOwner {
        stakingContract.executeCandidateBondLess(collatorContracts[_idCollator]);
    }

    function scheduleRevokation(uint8 _idCollator) external onlyOwner {
        stakingContract.scheduleRevokeDelegation(collatorContracts[_idCollator]);
    }

    function executeRevokation(uint8 _idCollator) external onlyOwner {
        stakingContract.executeDelegationRequest(address(this), collatorContracts[_idCollator]);
    }

    function __approve(address tokenAddress, address spender, uint256 amount) private {
        if (IERC20(tokenAddress).allowance(address(this), spender) < amount) {
            IERC20(tokenAddress).approve(spender, type(uint256).max);
        }
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
}

