<template>
<div class="shadow shadow-lg hover:shadow-lg bg-y">
  <div class="h-24 mx-auto px-5 flex items-center justify-around">
  <img src="logotransparent.png" class="h-24">
      <ul class="flex items-center justify-start gap-6 pt-2 text-xl" style="padding-right: 100px;">
        <li class="px-3"><a class="text-green-300 tracking-wide menuLink" href="#concept">CONCEPT</a></li>
        <li class="px-3"><a class="text-green-300 font-bold tracking-wide menuLink" href="#dapp">MINT</a></li>
        <li class="px-3"><a class="text-green-300 tracking-wide menuLink" href="#faq">FAQ</a></li>
      </ul>
      <button v-if="this.isConnected == false" type="button" @click="showModal()" class="text-white bg-green-500 shadow focus:ring-4 hover::font-weight-bold focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 mr-5 text-center">Connect Wallet</button>
      <p class="text-green-500 text-xs" v-else>
      <span class="leading-7"><b>EVM:</b> {{this.addy.shortEvm}}<br>
     <span v-if="this.addy.shortDot"><b>DOT:</b> {{this.addy.shortDot}}</span></span>
      </p>
  </div>
</div>
</template>

<script>
import { ethers } from "ethers";
export default {
  name: 'TopBar',
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

                try {
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const signerAddress = await signer.getAddress()
            window.address = signerAddress
            await this.truncate(signerAddress)
            this.isConnected = true;
            window.connected = true
                }
                catch(err) {
                  console.log(err)
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
.menuLink:hover {
  color: black;
  font-weight: 800;
  font-size: 110%;
}
</style>
