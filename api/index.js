
const express = require('express')

import { Squid } from "@0xsquid/sdk";
import { ethers } from "ethers";

const moonbeamContractAddress = "0x4c65300C5E9E8CC6D090fcA38ac81a5314228f35"
const polygonContractAddress = "0x91DA876F71ae356e14b6bAd19Bf42e131aa72323"
const bctContractAddress = "0x2F800Db0fdb5223b3C3f354886d907A671414A7F"
const senderABI = require("../abi/sender.json");
const receiverABI = require("../abi/receiver.json");
const erc20ABI = require("../abi/erc20.json");
const squidRouter = require("../abi/squidRouter.json");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.get('/price', async function (req, res) {
  let prices = {
    'glmr': 0,
    'nct': 0,
    'token': 0
  }

  let chainFromSwap = req.query.fromChain
  let tokenToSwap = req.query.fromToken
  console.log(chainFromSwap,tokenToSwap,'req parm')

  const getSDK = () => {
    const squid = new Squid({
      baseUrl: "https://api.0xsquid.com",
    });
    return squid;
  };
  const squid = getSDK();
  await squid.init();
  console.log("Squid inited");
  
let glmr = await getGLMRPrice(squid) // glmr USDC price
let bct = await getBCTPrice(squid) // bct USDC price
let fromCoin = await getTokenPrice(squid,chainFromSwap,tokenToSwap) // token USDC price

let pKarbRatio = await bct/glmr
let coinRatio = await bct/Number(fromCoin.replace(/\,/g,''))

 prices = await {
  'glmr': glmr,
  'bct': bct,
  'token': fromCoin,
  'swapFrom': Number(fromCoin.replace(/\,/g,'')),
  'swapRatioGlmr': pKarbRatio,
  'swapRatioToken': coinRatio
}

res.status(200).json(prices)

})


app.get('/getSwap', async function (req, res) {
  let chainFromSwap = req.query.fromChain
  let tokenToSwap = req.query.fromToken
  let amountToSwap = req.query.fromAmount
  let addyFromSwap = req.query.fromAddy

  console.log(chainFromSwap,tokenToSwap,'req parm')

const getSDK = () => {
    const squid = new Squid({
      baseUrl: "https://api.0xsquid.com",
    });
    return squid;
  };
  const squid = getSDK();
  await squid.init();
  console.log("Squid inited");

  let route = await getTokenToGlmr(squid,chainFromSwap,tokenToSwap,amountToSwap,addyFromSwap)
  res.status(200).json(route)
})

app.get('/getBCT', async function (req, res) {
  let chainFromSwap = req.query.fromChain
  let tokenToSwap = req.query.fromToken
  let amountToSwap = req.query.fromAmount
  let addyFromSwap = req.query.fromAddy


const getSDK = () => {
    const squid = new Squid({
      baseUrl: "https://api.0xsquid.com",
    });
    return squid;
  };
  const squid = getSDK();
  await squid.init();
  
  let route = await getBCTPrice(squid)
  //let route = await getTokenToBCT(squid,chainFromSwap,tokenToSwap,amountToSwap,addyFromSwap)
  console.log("BCT road",route);
  res.status(200).json(route)
})


app.get('/redeem', async function (req, res) {
  let amountFrom = req.query.amount
  

const getSDK = () => {
    const squid = new Squid({
      baseUrl: "https://api.0xsquid.com",
    });
    return squid;
  };
  const squid = getSDK();
  await squid.init();
  
  let route = await glmrToRedeemPolygon(squid,amountFrom)
  const squidContractInterface = new ethers.utils.Interface(squidRouter);
  let data = await route.transactionRequest.data
  let value = await route.params.fromAmount
  let totalFees = parseFloat(route.estimate.feeCosts[0].amount)+parseFloat(route.estimate.gasCosts[0].amount)
  let fullValue = parseFloat(value)+parseFloat(totalFees)

  const decodedArgs = squidContractInterface.parseTransaction({data,value}).args
  let sourceCall = decodedArgs.sourceCalls
  let destinationCall = decodedArgs.destinationCalls
  console.log(sourceCall)
  let request = {
    'value': fullValue,
    'source': sourceCall,
    'destination': destinationCall
  }
  
  //let route = await getTokenToBCT(squid,chainFromSwap,tokenToSwap,amountToSwap,addyFromSwap)
  res.status(200).json(request)
})

app.get('/burn', async function (req, res) {
  let amountFrom = req.query.fromAmount
  let chainFromSwap = req.query.fromChain
  let tokenToSwap = req.query.fromToken


const getSDK = () => {
    const squid = new Squid({
      baseUrl: "https://api.0xsquid.com",
    });
    return squid;
  };
  const squid = getSDK();
  await squid.init();
  
  let route = await glmrToRedeemPolygon(squid,chainFromSwap,tokenToSwap,amountFrom)
  const squidContractInterface = new ethers.utils.Interface(squidRouter);
  let data = await route.transactionRequest.data
  let value = await route.transactionRequest.data.value
  let totalFees = parseFloat(route.estimate.feeCosts[0].amount)+parseFloat(route.estimate.gasCosts[0].amount)
  //let fullValue = parseFloat(value)+parseFloat(route.estimate.feeCosts[0].amount)
  const decodedArgs = squidContractInterface.parseTransaction({data,value}).args
  let sourceCall = decodedArgs.sourceCalls
  let destinationCall = decodedArgs.destinationCalls
  

  let request = {
    'decoded': decodedArgs,
    'route': route,
    'data': data,
    'value': value,
    'source': sourceCall,
    'destination': destinationCall
  }

  console.log(request,'req a regarder ici')

  res.status(200).json(request)
})


async function glmrToRedeemPolygon(squid,chainFrom,tokenFrom,amountFrom) {
  let txValue = amountFrom
  let txDecim = 18
  let txAmount = ethers.utils.parseUnits(txValue, txDecim).toString()


  const swapParameters = {
      "fromChainId": chainFrom, 
      "fromTokenAddy": tokenFrom, 
      "amount": txAmount, // depends on token decimal
      "toChainId": 137, // Polygon
      "toTokenAddy": bctContractAddress, // bct
      "receiver": polygonContractAddress, 
  }
  

const bctContractInterface = new ethers.utils.Interface(erc20ABI);
const approveEncodeData = bctContractInterface.encodeFunctionData(
    "approve",
    [
        polygonContractAddress,
        "0" 
    ]
);



  const receiverInterface = new ethers.utils.Interface(receiverABI);
  const swapEncodeData = receiverInterface.encodeFunctionData(
  "redeemBCT",
  [
      "0",
      moonbeamContractAddress
  ]
  );

  const params = {
    fromChain: swapParameters.fromChainId, 
    fromToken: swapParameters.fromTokenAddy,
    fromAmount: swapParameters.amount,
    toChain: swapParameters.toChainId,
    toToken: swapParameters.toTokenAddy,
    toAddress: swapParameters.receiver,
    slippage: 1.00,
    enableForecall: true,
    quoteOnly: false,
    customContractCalls: [
      {
        callType: 1,
        target: swapParameters.toTokenAddy,
        value: "0",
        callData: approveEncodeData,
        payload: {
            tokenAddress: swapParameters.toTokenAddy,
            inputPos: 1
            },
            estimatedGas: "400000"
        },
        {
        callType: 1,
        target: polygonContractAddress,
        value: "0",
        callData: swapEncodeData,
        payload: {
            tokenAddress: swapParameters.toTokenAddy,
            inputPos: 0
        },
        estimatedGas: "400000"
        }
  ]
  } 
  
  let { route } = await squid.getRoute(params);
  return route
  }

async function getTokenToGlmr(squid,chainFrom,tokenFrom,amountFrom,addyFrom) {
  let txValue = amountFrom
  let txDecim = 18
  let txAmount = ethers.utils.parseUnits(txValue, txDecim).toString()
  const swapParameters = {
      "fromChainId": chainFrom, 
      "fromTokenAddy": tokenFrom, 
      "amount": txAmount, // depends on token decimal
      "toChainId": 1284, // moonbeam
      "toTokenAddy": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // glmr
      "receiver": moonbeamContractAddress, 
  }
  
  
  const senderInterface = new ethers.utils.Interface(senderABI);
  const swapEncodeData = senderInterface.encodeFunctionData(
  "nativeMint",
  [
      "0",
      tokenFrom,
      addyFrom,
      "0"
  ]
  );

  const params = {
    fromChain: swapParameters.fromChainId, 
    fromToken: swapParameters.fromTokenAddy,
    fromAmount: swapParameters.amount,
    toChain: swapParameters.toChainId,
    toToken: swapParameters.toTokenAddy,
    toAddress: swapParameters.receiver,
    slippage: 1.00,
    enableForecall: true,
    quoteOnly: false,
    customContractCalls: [

  ]
  } 
  
  let { route } = await squid.getRoute(params);
  return route
  }


async function getGLMRPrice(squid) {
let txValue = '1'
let txDecim = 18
let txAmount = ethers.utils.parseUnits(txValue, txDecim).toString()
const swapParameters = {
    "fromChainId": 1284, // Moonbeam
    "fromTokenAddy": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // native token
    "amount": txAmount, // depends on token decimal
    "toChainId": 137, // Polygon
    "toTokenAddy": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC native Polygon
    "receiver": "0x369f70B926BCBbc1bb67f8C13b54F25D45D1959b", // deployer wallet
}

const params = {
  fromChain: swapParameters.fromChainId, 
  fromToken: swapParameters.fromTokenAddy,
  fromAmount: swapParameters.amount,
  toChain: swapParameters.toChainId,
  toToken: swapParameters.toTokenAddy,
  toAddress: swapParameters.receiver,
  slippage: 1.00,
  enableForecall: true,
  quoteOnly: false,
  customContractCalls: [
]
} 

let { route } = await squid.getRoute(params);
return route.estimate.toAmountUSD
}

async function getBCTPrice(squid) {
  let txValue = '1'
  let txDecim = 18
  let txAmount = ethers.utils.parseUnits(txValue, txDecim).toString()
  const swapParameters = {
      "fromChainId": 137, // Polygon
      "fromTokenAddy": "0x2F800Db0fdb5223b3C3f354886d907A671414A7F", // BCT
      "amount": txAmount, // depends on token decimal
      "toChainId": 137, // Polygon
      "toTokenAddy": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", // USDC native Polygon
      "receiver": "0x369f70B926BCBbc1bb67f8C13b54F25D45D1959b", // deployer wallet
  }
  
  const params = {
    fromChain: swapParameters.fromChainId, 
    fromToken: swapParameters.fromTokenAddy,
    fromAmount: swapParameters.amount,
    toChain: swapParameters.toChainId,
    toToken: swapParameters.toTokenAddy,
    toAddress: swapParameters.receiver,
    slippage: 1.00,
    enableForecall: true,
    quoteOnly: false,
    customContractCalls: [
  ]
  } 
  
  let { route } = await squid.getRoute(params);
  return route.estimate.toAmountUSD
  }

  async function getTokenPrice(squid,fromId,token) {
    let txDecim = await checkDecim(token)
    let txValue = '1'
    
    let txAmount = ethers.utils.parseUnits(txValue, txDecim).toString()


    const swapParameters = {
        "fromChainId": fromId, 
        "fromTokenAddy": token, 
        "amount": txAmount, // depends on token decimal
        "toChainId": 1284, // moonbeam
        "toTokenAddy": "0xCa01a1D0993565291051daFF390892518ACfAD3A", // USDC glmr
        "receiver": "0x369f70B926BCBbc1bb67f8C13b54F25D45D1959b", // deployer wallet
    }
    
    const params = {
      fromChain: swapParameters.fromChainId, 
      fromToken: swapParameters.fromTokenAddy,
      fromAmount: swapParameters.amount,
      toChain: swapParameters.toChainId,
      toToken: swapParameters.toTokenAddy,
      toAddress: swapParameters.receiver,
      slippage: 1.00,
      enableForecall: true,
      quoteOnly: false,
      customContractCalls: [
    ]
    } 
    
    let { route } = await squid.getRoute(params);
    return route.estimate.toAmountUSD
    }

    async function findStable(fromId) {
      let stabledAddy = "a"
      if (fromId == 1 || fromId == 137) {
        stableAddy = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      }
      if (fromId == 1284) {
        stableAddy = "0x931715FEE2d06333043d11F658C8CE934aC61D0c"
      }
      if (fromId == 18) {
        stableAddy = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
      }
      if (fromId == 42220) {
      stableAddy = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
      }
  }

  async function checkDecim(token) {
    let txDecim = 18
    if (token == "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b" || token == "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73" || token == "0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9" || token == "0x931715FEE2d06333043d11F658C8CE934aC61D0c" || token == "0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d") {
      txDecim = 6
    }
    if (token == "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080") {
      txDecim = 10
    }
    return txDecim
  }




export default {
  path: '/api',
  handler: app
}

