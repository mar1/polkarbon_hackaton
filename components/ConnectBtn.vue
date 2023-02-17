<!-- Please remove this file from your project -->
<template>
<div>
      <button v-if="this.isConnected == false" type="button" @click="showModal()" class="text-white bg-green-500 shadow focus:ring-4 hover::font-weight-bold focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mr-5 text-center">Connect Wallet</button>
</div>
</template>

<script>
import { ethers } from "ethers";
export default {
  name: 'ConnectBtn',
    data() {
      return {
        isConnected: new Boolean,
        chain: 1284,
        addy: {
          evm: '',
          dot: '',
          shortEvm: '',
          shortDot: '',
        },
      }
    },
  methods: {
        async connect(provider) {
            let chainId = await provider.getNetwork()
            if (chainId.chainId != this.chain) {
            alert(`Please connect to correct Network (chain ID ${this.chain})`)
            }
            else {
                try {
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const signerAddress = await signer.getAddress()
            window.address = signerAddress
            await this.truncate(signerAddress)
            this.isConnected = true;
            console.log(this.isConnected)
                }
                catch(err) {
                  console.log(err)
                }
            }
    },

    async showModal() {
      if (await window.isConnected != true) {
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
    }

  }
}
</script>

<style>
.bg-g {
  background-color: #C8FFD4;
}
.bg-y {
  background-color: #FDFDBD;
}
.bg-b {
  background-color: #B8E8FC;
}
.cl-p {
  color: #B1AFFF;
}
.cl-b {
  color: #B8E8FC;
}
.cl-g {
  color: #C8FFD4;
}
</style>
