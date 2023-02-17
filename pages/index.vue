<template>
<div id="wrapper">
  <TopBar/>
  <ConnectModal/>
  <Hero/>
  <Features/>
  <ModePicker/>
  <FAQ/>
  <Footer/>
  <FormHandler/>
</div>
</template>

<script lang="ts">
import Vue from 'vue'



export default Vue.extend({
  name: 'IndexPage',
    data() {
      return {

      }
    },
async mounted() {

  },
  methods: {

  }
})
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>