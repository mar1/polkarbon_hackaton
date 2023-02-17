<template>
<section class="bg-g" id="dapp">

  <div
    class="mx-auto max-w-screen-xl px-4 grid py-6 items-center text-center"
  >
  <div class="pt-6">
    <img src="logotransparent.png" class="h-44 mx-auto text-center">
        <h1 class="font-bold text-center text-3xl text-green-500">time to have an impact 🌞</h1>
</div>
<div class="grid grid-cols-2 gap-8 mx-auto text-center">
  <div class="bg-white bg-opacity-10 p-8 rounded-lg mx-12">
    <img src="/impact1.png" alt="immediate impact image" class="rounded-lg mb-4 h-52 mx-auto shadow">
    <h2 class="pt-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">immediate impact</h2>
    <p class="text-gray-600 font-semibold mb-3">cross-chain swap & burn C02 tons</p>
    <button class="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full" @click="showModal(1)">burn c02</button>
  </div>
    <div class="bg-white bg-opacity-10 p-8 rounded-lg">
    <img src="/impact2.png" alt="long term impact image" class="rounded-lg mb-4 h-52 mx-auto shadow">
    <h2 class="pt-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">long-term impact</h2>
    <p class="text-gray-600 font-semibold mb-3">mint of pKarb token generating a positive green yield</p>
    <button class="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full" @click="showModal(2)">mint pKarb</button>
  </div>
</div>
<div>
        <p class="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-green-500">
        <span class="text-black mx-1">🌱</span> <b>Please note that this dApp is a hackathon project and should be used with caution.</b>
        The purpose of this dApp is to demonstrate the potential of cross-chain technology and on-chain carbon credits and is <u>not intended for use in the management of real funds.</u>
      </p>
      </div>
  </div>
</section>

</template>

<script>
export default {
  name: 'ModePicker',
  methods: {
        async showModal(id) {
    let modal1 = document.getElementById("modal1");
    let modal2 = document.getElementById("modal2");
      if (id == 1) {
        modal1.style.display = "block";
      }
      else if (id == 2) {
        modal2.style.display = "block";
      }
    },
  }
}
</script>
