<template>
  <div>
    <Navigation />
    <ThreeScene />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import ThreeScene from './components/ThreeScene.vue'


export default {
  components: {
    Navigation,
    ThreeScene
  },
} 

</script>

<style lang='scss'>
  @import "./styles/index.scss";
</style>
