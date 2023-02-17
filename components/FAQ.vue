<template>
<section class="bg-y" id="faq">
  <div
    class="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
    <div class="mx-auto max-w-3xl text-center">
      <h1
        class="pt-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent">
        FREQUENTLY ASKED QUESTIONS
      </h1>
<div class="mt-14">
<div class="w-full">
  <div class="flex items-center mb-4">
    <div class="bg-purple-600 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl font-bold mr-4">Q</div>
    <h3 class="text-lg font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">What is Polkarbon ?</h3>
  </div>
  <div class="mb-8 px-4 text-gray-700">
    <p class="hidden answer text-blue-500 font-semibold">Polkarbon is an experimental project made for Polkadot Global Hackaton, Europe Series.
</p>
  </div>
</div>

<div class="w-full">
  <div class="flex items-center mb-4">
    <div class="bg-purple-600 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl font-bold mr-4">Q</div>
    <h3 class="text-lg font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">What’s the utility of Polkarbon ?</h3>
  </div>
  <div class="mb-8 px-4 text-gray-700">
    <p class="hidden answer text-blue-500 font-semibold">Polkarbon aims to bring green assets on Polkadot through cross-chain contracts interactions. This dApp has two main utilities : 
<br>
- carbon credits offsetter from any chain
<br>
- mint pKarb backed by GLMR producing a positive green yield</p>
  </div>
</div>

<div class="w-full">
  <div class="flex items-center mb-4">
    <div class="bg-purple-600 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl font-bold mr-4">Q</div>
    <h3 class="text-lg font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">What is pKarb ?</h3>
  </div>
  <div class="mb-8 px-4 text-gray-700">
    <p class="hidden answer text-blue-500 font-semibold"><b>pKarb is the token of Polkarbon dApp.</b><br>They’re all backed by 1 GLMR. All the pKarb are made of GLMR staked in a collective green delegation. The supply of pKarb logically equals the total of GLMR staked in the contract.</p>
  </div>
</div>

<div class="w-full">
  <div class="flex items-center mb-4">
    <div class="bg-purple-600 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl font-bold mr-4">Q</div>
    <h3 class="text-lg font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">Where the carbon credits are coming from ?</h3>
  </div>
  <div class="mb-8 px-4 text-gray-700">
    <p class="hidden answer text-blue-500 font-semibold">Polkarbon is directly using Toucan Protocol tokens on Polygon.<br>These tokens are : Base Carbon Ton (BCT) & Natural Carbon Ton (NCT). Both are backed by real CO2 offsetter.
By using Toucan’s tokens, we’re sure these credits are legit, verifiable and redeemable.</p>
  </div>
</div>

<div class="w-full">
  <div class="flex items-center mb-4">
    <div class="bg-purple-600 rounded-full h-12 w-12 flex items-center justify-center text-white text-2xl font-bold mr-4">Q</div>
    <h3 class="text-lg font-medium bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">Why building on Moonbeam ?</h3>
  </div>
  <div class="mb-8 px-4 text-gray-700">
    <p class="hidden answer text-blue-500 font-semibold">Moonbeam is the only chain allowing this type of cross-chain dApps. You can use here tokens from almost any EVM chains thanks to Squid to actively decarb. You can also use xcTokens from Polkadot parachains. Also, being able to stake directly from a smart-contract is an awesome trust guarantee.</p>
  </div>
</div>

</div>
</div>
  </div>
</section>

</template>

<script>
export default {
  name: 'FAQ',
  mounted() {


  const questions = document.querySelectorAll('.w-full');
  questions.forEach(question => {
    const answer = question.querySelector('.answer');
    question.addEventListener('click', () => {
      answer.classList.toggle('hidden');
    });
  });

  
  },
  methods: {

  }
}
</script>

<style scoped>
h3:hover {
  cursor: pointer;
}
</style>
