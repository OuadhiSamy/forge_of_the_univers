<template>
  <div>
    <Header />
    <ThreeScene />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ThreeScene from './components/ThreeScene.vue'


export default {
  components: {
    Header,
    ThreeScene
  }
} 

</script>

<style lang='scss'>
@import "./styles/index.scss";
</style>
