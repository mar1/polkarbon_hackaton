
![Logo](https://polkarbon.herokuapp.com/logogreen.png)


# Polkarbon

Polkarbon is an experimental project made for Polkadot Global Hackaton, Europe Series.
The goal is to connect technologies from EVM chains, Polkadot and Moonbeam specificities while keeping an ethical perspective by using Toucan Protocol.
It has 2 main functions : one for immediate carbon offsetting from any chain and another function for long-term impact based on pKarb token.


## Features

- Crosschain swap from EVM chains to Polygon receiver to redeem BCT tokens (tokenized CO2)
- Mint of pKarb, ERC20 indexed on BCT token/GLMR token ratio.
- Interaction with the staking precompile to stake GLMR token
- Ability to send the yield in a cross-chain swap to the Polygon receiver
- Ability to perform swap from allowed ERC20 tokens on Stellaswap for GLMR before minting pKarb 
- Handle xc20 tokens with sufficient liquidities
- Handle 4 different wallets


## Tech Stack

**Client:** Vue.js, Nuxt, Tailwind

**Server:** Node, Express

**Blockchain tool:** Ethers, Interfaces (Staking precompile, Squid router, Uniswap router, Toucan Offsetter)

## Demo

Test front-end deployed version at https://polkarbon.herokuapp.com/


## Components

This project is composed of 3 distinct parts: 

- A Progressive Web App to do cross-chain carbon offsetting (immediate impact) or minting pKarb against GLMR (that are staked)
- A back-end fetching the data and forging the best multichain calls possible thanks to Squid API & Axelar
- 2 smart contracts (Sender on Moonbeam (pKarb) / Receiver on Polygon)

## Addresses:
- Moonbeam : 0xeB368A18412fE3A787b4C32CebD91d04Ddfd81D9
- Polygon : 0x91DA876F71ae356e14b6bAd19Bf42e131aa72323


## Lessons Learned

This project has taught me a lot in the last 3 weeks. It's the 1st time I participate alone to an one hackaton but it's also the 1st time I realize a cross-chain dApp

The most difficult part was to handle calls from and to Axelar multicall thanks to Squid API. It required some exploration on several block explorers and creating my own interfaces.

On the other hand, the management of xc20 and staking precompile was super well documented and easier than I thought.

## Roadmap

- Improve Backend Performance

- Adding redeem function (1 pKarb / 1 staked GLMR) with respect to lock duration

- Turn into a DAO with voting power based on holdings

- Make pKarb minting from other chains

- Add more xcTokens

- Build a game or a NFT using pKarb to lock some value in the protocol


## 🚀 About Me
My name is Marin, i'm a web3 full-stack developer, working with my DAOs frens on the first P2E game on Moonbeam Network, called "THE GREAT ESCAPE". I used this hackaton as an opportunity to explore cross-chain usecases on Moonbeam. I wanted also to create a meaningful project, that's why it's using Toucan tokens.
