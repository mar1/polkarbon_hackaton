<template>


<div>
<FormMint/>
<FormBurn/>
<ConnectModal/>
</div>
</template>

<script>
import { ethers } from "ethers";

export default {
  name: 'FormHandler',
    data() {
      return {
        chain: 1284,
        chains: ["i"],
        tokens: [],
        isOptionsExpanded: false,
        selectedOption: "Moonbeam",
        options: [],
        addy: {},
        currentPanel: 0,
      }
    },
async mounted() {
    const response = await fetch("/chains.json");
    const file = await response.json();
    this.options = file
  },
  methods: {
    async showStep(next) {
        if (next == true) {
          this.currentPanel = this.currentPanel + 1
        }
        else {
          //this.panel - 1
        }
      },
  

    async setChainId(chainId) {
      this.chain = chainId
    },

    async switchNetwork(chainId) {
    if (window.connected==undefined) {
      await this.showModal()
    }
    else {
    let provider = await new ethers.providers.Web3Provider(window.chosenProvider)
    let currentChainId = await provider.getNetwork()
      if (await currentChainId.chainId != chainId) {
        console.log(currentChainId.chainId,chainId)
        try {
          let hexID = `0x${chainId.toString(16)}`
          const switchN = await window.chosenProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexID}],
          });
          console.log(switchN)
        }
        catch (switchError) {
          if (switchError.code === 4902) {
          console.log("This network is not available in your Metamask, please add it")
          }
          console.log(switchError)
          console.log("Failed to switch to the network")
        }
      }
    }
    this.showStep(true)
  },

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

    setOption(option) {
      this.selectedOption = option;
      this.isOptionsExpanded = false;
    }
  }
}
</script>
