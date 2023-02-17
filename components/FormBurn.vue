<!-- Please remove this file from your project -->
<template>
<div>
  <!-- PANEL 1: chain picker -->
    <div class="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
	id="modal1">
      <div class="back mx-auto text-center">
          <div class="text-center mx-auto whitespace-nowrap">
            <button @click="closeModal()" class="transition duration-200 mx-auto px-5 py-4 cursor-pointer font-normal text-center text-sm rounded-lg text-gray-500 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#C8FFD4" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
    
      </div>
    <div class="step w-64 mx-auto bg-white shadow w-50 rounded-lg divide-y divide-gray-200 w-96 my-auto relative top-1 align-middle">
      <div v-bind:class="{ flex: this.isConnected}" class="px-5 py-7">
        <label class="font-semibold text-sm text-gray-600 pb-1 block">From Chain:</label>

  <div class="relative text-lg">
      <button
        class="flex items-center justify-between px-3 py-2 bg-white w-full border rounded-lg"
        @click="isOptionsExpanded = !isOptionsExpanded"
        @blur="isOptionsExpanded = false"
      >
        <span>{{ selectedChainOption.name }}</span>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
          :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <transition
        enter-active-class="transform transition duration-500 ease-custom"
        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
        enter-to-class="translate-y-0 scale-y-100 opacity-100"
        leave-active-class="transform transition duration-300 ease-custom"
        leave-class="translate-y-0 scale-y-100 opacity-100"
        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
      >
        <ul
          v-show="isOptionsExpanded"
          class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
        >
          <li
            v-for="(option, index) in chainsOptions"
            :key="index"
            class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
            @mousedown.prevent="setOption(option,1)"
            @click="setChainId(option.chainId)"
            
          >
          <img :src="option.icon" class="inline-flex h-8 mx-3 my-2">
          {{ option.name }}
          </li>
        </ul>
      </transition>
            <button @click="switchNetwork(chain)" type="button" class="transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mt-6">
              <span class="inline-block mr-2">Confirm Chain</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
      </div>
      <div class="p-5">
          <div class="grid grid-cols-3 gap-1">
              <button onclick="window.location.href='#faq';" @click="closeModal()" type="button" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">FAQ</button>
              <button type="button" onclick="window.location.href='https://twitter.com/polkarbon';" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Twitter</button>
              <button type="button" onclick="window.location.href='https://github.com/mar1/polkarbon_hackaton';" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
          </div>
      </div>

    </div>

<!-- PANEL 2: token picker -->

<div class="hidden step w-64 mx-auto bg-white shadow w-50 rounded-lg divide-y divide-gray-200 w-96 my-auto align-middle">
          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
      <div class="px-5 py-7">
        <label class="font-semibold text-sm text-gray-600 pb-1 block">From Token:</label>

  <div class="relative text-lg">
      <button
        class="flex items-center justify-between px-3 py-2 bg-white w-full border rounded-lg"
        @click="isOptionsExpanded = !isOptionsExpanded"
        @blur="isOptionsExpanded = false"
      >
        <span>{{ selectedTokenOption.name }}</span>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
          :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <transition
        enter-active-class="transform transition duration-500 ease-custom"
        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
        enter-to-class="translate-y-0 scale-y-100 opacity-100"
        leave-active-class="transform transition duration-300 ease-custom"
        leave-class="translate-y-0 scale-y-100 opacity-100"
        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
      >
        <ul
          v-show="isOptionsExpanded"
          class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden"
        >
          <li
            v-for="(option, index) in tokensOptions"
            :key="index"
            class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
            @mousedown.prevent="setOption(option,2)"
            @click="setChainId(option.chainId)"
        
            
          >
          <img :src="option.logoURI" class="inline-flex h-8 mx-3 my-2">
          {{ option.name }}
          </li>
        </ul>
      </transition>
              <button @click="formStep(2)" type="button" class="transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mt-6">
            <span class="inline-block mr-2">Confirm Token</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </button>
    </div>
      </div>

      <div class="p-5">
          <div class="grid grid-cols-3 gap-1">
              <button onclick="window.location.href='#faq';" @click="closeModal()" type="button" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">FAQ</button>
              <button type="button" onclick="window.location.href='https://twitter.com/polkarbon';" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Twitter</button>
              <button type="button" onclick="window.location.href='https://github.com/mar1/polkarbon_hackaton';" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
          </div>
      </div>
    </div>
</div>

<!-- PANEL 3: decarb panel -->

<div class="hidden step w-64 mx-auto bg-white shadow w-50 rounded-lg divide-y divide-gray-200 w-96 my-auto align-middle">
          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
      <div class="px-5 py-7">
 

 <label class="text-sm text-gray-600 pb-1 font-bold block">Amount to decarb:</label>
 <div class="mx-auto text-center">
<input v-model="decarbValue" id="steps-range" type="range" min="1" max="100"  class="w-full h-2 rounded-lg cursor-pointer dark:bg-gray-700">
<p class="font-semibold"><input v-model="decarbValue" class="w-8 h-10 px-0 rounded-lg cursor-pointer text-green-500 font-bold" type="text">  CO2 ton<span v-if="decarbValue>1">s 🍃</span><span v-if="decarbValue>10">🍃</span><span v-if="decarbValue>50">🍃</span><span v-if="decarbValue>75">🍃</span><span v-if="decarbValue==100">🍃</span></p>
</div>
<br>
<div class="grid grid-cols-2 gap-4">
  <div>
    <label class="font-semibold text-sm text-gray-600 pb-1 block">Price per Ton:</label>
    <p class="font-semibold">{{parseFloat(prices.bct).toFixed(2)}} $</p>
  </div>

  <div>
   <label class="font-semibold text-sm text-gray-600 pb-1 block">Total USD Price:</label>
   <p class="">{{(prices.bct*decarbValue).toFixed(2)}} $</p></div>
</div>


<br>
 <p class=" mx-auto text-center py-2"><label class="text-green-500 text-xl font-extrabold text-transparent">Swap Rate</label></p>
<input v-model="prices.swapInExact" type="text" id="swapIn" class="flex items-center justify-between px-3 py-2 bg-white w-full border rounded-lg font-semibold" placeholder="0" disabled>

<div class="py-4 text-center content-center mx-auto">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#10b981" class="w-6 h-6 mx-auto text-center">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
</svg>
</div>

<input v-model="prices.swapOutExact" type="text" id="swapOut" class="flex items-center justify-between px-3 py-2 bg-white w-full border rounded-lg font-semibold" placeholder="0" disabled>

              <button @click="executeSwap()" type="button" class="transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mt-6">
            <span class="inline-block mr-2">Decarb!</span>
        </button>
        <div v-if="this.estimatedTime > 0" class="py-3">
        <p>{{this.estimateFees}} $ Estimated cross-chain fees</p>
        <p>{{this.estimatedTime}} Estimated transaction time (in seconds)</p>
        </div>
      </div>

      <div class="p-5">
          <div class="grid grid-cols-3 gap-1">
              <button onclick="window.location.href='#faq';" @click="closeModal()" type="button" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">FAQ</button>
              <button type="button" onclick="window.location.href='https://twitter.com/polkarbon';"  class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Twitter</button>
              <button type="button" onclick="window.location.href='https://github.com/mar1/polkarbon_hackaton';" class="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
          </div>
      </div>
    </div>
</div>
</div>
</div>      
</template>

<script>
import { ethers } from "ethers";

const squidRouter = require("../abi/squidRouter.json");
const erc20ABI = require("../abi/erc20.json");
const receiverABI = require("../abi/receiver.json");

const moonbeamContractAddress = "0xeB368A18412fE3A787b4C32CebD91d04Ddfd81D9"
const polygonContractAddress = "0x91DA876F71ae356e14b6bAd19Bf42e131aa72323"
const squidContractAddress = "0xce16F69375520ab01377ce7B88f5BA8C48F8D666"
const bctContractAddress = "0x2F800Db0fdb5223b3C3f354886d907A671414A7F"

export default {
  name: 'FormBurn',
    data() {
      return {
        chains: ["i"],
        tokens: [],
        isOptionsExpanded: false,
        selectedChainOption: {'name':'Moonbeam','chainId':1284},
        chainsOptions: [],
        selectedTokenOption: {},
        tokensOptions: [],
        addy: {},
        currentPanel: 0,
        decarbValue: 1,
        prices: {
          'glmr': 0,
          'bct': 0,
          'token': 0,
          'swapFrom': 0,
          'swapRatioGlmr': 0,
          'swapRatioToken': 0,
          'swapInExact': '0',
          'swapOutExact': '0',
        },
      'burnTx': {},
       fees: 0,
       swapValue: 0,
       estimatedTime: 0,
       estimateFees: '',
      }
    },
        watch : {
               decarbValue:function() {
                    if (this.decarbValue > 1) {
                        this.prices.swapInExact = `${this.decarbValue} CO2 tons`
                    }
                    else {
                        this.prices.swapInExact = `${this.decarbValue} CO2 ton`
                    }
                    this.prices.swapOutExact = `${(this.prices.swapRatioToken).toFixed(4) * this.decarbValue} ${this.selectedTokenOption.symbol}`
               },
              prices:function() {
                    if (this.decarbValue > 1) {
                        this.prices.swapInExact = `${this.decarbValue} CO2 tons`
                    }
                    else {
                        this.prices.swapInExact = `${this.decarbValue} CO2 ton`
                    }
                    this.prices.swapOutExact = `${(this.prices.swapRatioToken).toFixed(4)  * this.decarbValue} ${this.selectedTokenOption.symbol}`
               },
            },

async mounted() {
     const chainsResponse = await fetch("/chains.json");
     const chainsFormat = await chainsResponse.json();
     this.chainsOptions = chainsFormat
  },
  methods: {

//fct to handle the decarb process display
  async formStep(id) {
    let steps = window.document.getElementsByClassName('step')

    if (id == 0) {
        steps[4].style.display = "block"
        steps[5].style.display = "none"
        steps[6].style.display = "none"
    }

    if (id == 1) {
      const tokensResponse = await fetch("/tokens.json");
      const tokensFormat = await tokensResponse.json();
      this.tokensOptions = tokensFormat
        let filteredTokens = []
        for (let i=0; i<this.tokensOptions.length;i++) {
          if (this.tokensOptions[i].chainId == this.selectedChainOption.chainId && this.tokensOptions[i].disabled != true) {
            filteredTokens.push(this.tokensOptions[i])
          }
        }
      this.tokensOptions = filteredTokens
      this.selectedTokenOption = filteredTokens[0]

        steps[4].style.display = "none"
        steps[5].style.display = "block"
        steps[6].style.display = "none"
    }

    if (id == 2) {
        steps[4].style.display = "none"
        steps[5].style.display = "none"
        steps[6].style.display = "block"

        this.getSwapInfos()
    }

        if (id == 3) {
        steps[0].style.display = "none"
        steps[1].style.display = "none"
        steps[2].style.display = "none"
        steps[3].style.display = "block"

        try {
        this.getSwapData()
        }
        catch(err) {
          console.log(err)
        }
    }
 },

// fct to handle switch network
    async switchNetwork(chainId) {
    if (window.connected==undefined) {
      await this.showModal()
    }
    else {
    let provider = await new ethers.providers.Web3Provider(window.chosenProvider)
    let currentChainId = await provider.getNetwork()
    console.log('Selected option',currentChainId.chainId, this.selectedChainOption )
      if (await currentChainId.chainId != this.selectedChainOption.chainId) {
        try {
          let hexID = `0x${this.selectedChainOption.chainId.toString(16)}`
          const switchN = await window.chosenProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexID}],
          });
          console.log(switchN)
          this.formStep(1)
        }
        catch (switchError) {
          if (switchError.code === 4902) {
          console.log("This network is not available in your Metamask, please add it")
          }
          console.log(switchError)
          console.log("Failed to switch to the network")
        }
      }

      else if (currentChainId.chainId == this.selectedChainOption.chainId) {
        this.formStep(1)
      }

    }
  },

  // fct helper previous one
  async setChainId(chainId) {
      this.chain = chainId
    },

// fct to connect wallet
    async connect(provider) {
      try {
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const signerAddress = await signer.getAddress()
            window.address = signerAddress
            await this.truncate(signerAddress)
            this.isConnected = true;
            window.connected = true;
            console.log(this.isConnected)
          }
      catch(err) {
          console.log(err)
         }
            
    },

// fct to display connect modal
      async showModal() {
        if (await this.isConnected != true) {
          let elModal = window.document.getElementById('modal')
          elModal.style.display = "flex"; 
          const div = document.getElementById('modalp');
          div.onclick = async () => {
          let provider = await new ethers.providers.Web3Provider(window.chosenProvider)
            try {
              this.connect(provider)
            }
            catch(err) {
              console.log(err)
            }
        }
      } 
    },

// fct to truncate and return a short addy
      async truncate(addy) {
          const truncateRegexEvm = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
          const match = addy.match(truncateRegexEvm);
            if (!match) return address;
            this.addy.shortEvm = `${match[1]}…${match[2]}`;
            this.addy.evm = addy
              if (window.dotProvider != "" && window.dotProvider != undefined) {
              const truncateRegexDot = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
              const match2 = window.dotProvider.match(truncateRegexDot);
                if (!match2) return address;
                this.addy.shortDot = `${match2[1]}…${match2[2]}`;
                this.addy.dot = window.dotProvider
          }
    },

// fct to fetch ratio and initial price
    async getSwapInfos() {
      try {
        let amount = parseFloat(this.prices.swapIn * this.decarbValue)
        const response = await this.$axios.get(`/api/price?fromChain=${this.selectedChainOption.chainId}&fromToken=${this.selectedTokenOption.address}`)
        let swapInfos = await response.data
        this.prices = swapInfos
        console.log(swapInfos,'swapInfos on BCT')
      } catch (err) {
        console.log(err)
      }
    },

// fct to fetch specific price
    async getSwapData() {
      
        let amount = parseFloat(this.prices.swapRatioToken * this.decarbValue)

        const response = await this.$axios.get(`/api/burn?fromChain=${this.selectedChainOption.chainId}&fromToken=${this.selectedTokenOption.address}&fromAmount=${amount.toString()}`)
        let swapInfos = await response.data
        this.burnTx = await swapInfos
        await console.log(this.burnTx,'swapInfos for burning NCT on polygon')
  },

// fct to launch a crosschain call to polygon receiver with bct tokens if required parameters met
    async executeSwap() {
      await this.getSwapData()

      const provider = new ethers.providers.Web3Provider(window.chosenProvider)
      //handling squid address rewriting
      if (this.selectedTokenOption.address == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
            //native mint with GLMR, no need to approve, straight to the contract
            console.log('native currency')
            let decarbTx = await this.decarb(provider,this.burnTx)
            console.log(decarbTx, 'cross redeem successfull')
          }
          else {
            //native mint with ERC20, need to check approve before swapping
            console.log('need to approve', this.selectedTokenOption.address, 'for', this.swapValue, 'on', moonbeamContractAddress)
            let allowance = await this.checkNativeAllowance(provider,window.address,this.selectedTokenOption.address,this.swapValue)
              if (allowance == true) {
                  let decarbTx = await this.decarb(provider,this.burnTx)
                  console.log(decarbTx, 'cross redeem successfull')              }
              else {
                  await this.approveNative(provider,window.address,this.selectedTokenOption.address,this.swapValue)
                  let decarbTx = await this.decarb(provider,this.burnTx)
                  console.log(decarbTx, 'cross redeem successfull')              }
          }
    },


//fct to execute contract call based on previous function
async decarb(provider,route) {
  const signer = provider.getSigner()
  const squidContract = new ethers.Contract(squidContractAddress, squidRouter, signer)
  let estimate = this.burnTx.route.estimate
  this.estimatedTime = estimate.estimatedRouteDuration
  this.estimateFees = estimate.feeCosts[0].amountUSD

  document.getElementById('mintBtn').innerText = 'Check fees...'

  console.log(this.burnTx,'data')
    let tx = await squidContract.callBridgeCall(
    this.burnTx.decoded[0],
    this.burnTx.decoded[1],
    this.burnTx.decoded[2],
    this.burnTx.decoded[3],
    this.burnTx.decoded[4],
    this.burnTx.decoded[5],
    this.burnTx.decoded[6],
    this.burnTx.decoded[7],
    { value: this.burnTx.route.transactionRequest.value })

  document.getElementById('mintBtn').innerText = 'Minting in progress...'
  document.getElementById('arrow').style.display = 'None'
  const txReceipt = await tx.wait();
  document.getElementById('mintBtn').innerText = 'Minting successfull!'
},

// fct to handle erc20 allowance
async checkNativeAllowance(provider,wallet,token,amount) {
const tokenContract = new ethers.Contract(token, erc20ABI, provider)
let allowance = await tokenContract.allowance(wallet,squidContractAddress)
let allowance2= ethers.utils.formatUnits(allowance)

if (allowance2 < amount) {
  console.log('not enough')
let enoughAllowance = false
return enoughAllowance
}
else {
let enoughAllowance = true
return enoughAllowance
}
},

// fct to approve tokens allowance
async approveNative(provider,wallet,token,amount) {
  const signer = provider.getSigner()
  const tokenContract = new ethers.Contract(token, erc20ABI, signer)
  let approval = await tokenContract.approve(squidContractAddress,amount)
  document.getElementById('mintBtn').innerText = 'Approval in progress...'
  document.getElementById('arrow').style.display = 'None'
  await approval.wait()
  document.getElementById('mintBtn').innerText = 'Minting pKarb...'
},

    setOption(option,id) {
      if (id==1) {
      this.selectedChainOption = option;
      this.isOptionsExpanded = false;
      }
      else if (id==2) {
      this.selectedTokenOption = option;
      this.isOptionsExpanded = false;
      }
      else if (id==3) {
      this.selectedTokenOption = option;
      this.isOptionsExpanded = false;
      }
      
    },

    async closeModal() {
      document.getElementById('modal1').style.display = "None"
    }
  }
}
</script>

<style scoped>
.step {
  border: solid 3px #C8FFD4;
}

input[type="range"] {
  --thumbSize: 18px;
  --trackSize: 8px;
  --thumbBg: #B1AFFF;
  --trackBg: #f2f2f2;
  --progressBg: #10b981;

  /* webkit progress workaround */
  --webkitProgressPercent: 0%;
}

#swapIn, #swapOut{
  border-color:  #B1AFFF;
  width: auto;
  text-align: center;
  margin: 0 auto;
}

input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: var(--thumbSize);
  width: 100%;
  margin: 0;
  padding: 0;
}
input[type="range"]:focus {
  outline: none;
}

/* Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--thumbSize);
  height: var(--thumbSize);
  background-color: var(--thumbBg);
  border-radius: calc(var(--thumbSize) / 2);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  width: var(--thumbSize);
  height: var(--thumbSize);
  background-color: var(--thumbBg);
  border-radius: calc(var(--thumbSize) / 2);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
  cursor: pointer;
}
input[type="range"]::-ms-thumb {
  -ms-appearance: none;
  appearance: none;
  width: var(--thumbSize);
  height: var(--thumbSize);
  background-color: var(--thumbBg);
  border-radius: calc(var(--thumbSize) / 2);
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: calc(((var(--thumbSize) - var(--trackSize)) / 2) * -1);
  cursor: pointer;
}

/* Track */
input[type="range"]::-webkit-slider-runnable-track {
  height: var(--trackSize);
  background-image: linear-gradient(
    90deg,
    var(--progressBg) var(--webkitProgressPercent),
    var(--trackBg) var(--webkitProgressPercent)
  );
  border-radius: calc(var(--trackSize) / 2);
}
input[type="range"]::-moz-range-track {
  height: var(--trackSize);
  background-color: var(--trackBg);
  border-radius: calc(var(--trackSize) / 2);
}
input[type="range"]::-ms-track {
  height: var(--trackSize);
  background-color: var(--trackBg);
  border-radius: calc(var(--trackSize) / 2);
}

/* Progress */
input[type="range"]::-moz-range-progress {
  height: var(--trackSize);
  background-color: var(--progressBg);
  border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
}
input[type="range"]::-ms-fill-lower {
  height: var(--trackSize);
  background-color: var(--progressBg);
  border-radius: calc(var(--trackSize) / 2) 0 0 calc(var(--trackSize) / 2);
}

.back {
  text-align: center;
  margin-left: 22rem;
  margin-top: 7rem;
}

</style>
