<template>
  <div>
    <ThreeScene />
  </div>
</template>

<script>
import ThreeScene from './components/ThreeScene.vue'


export default {
  components: {
    ThreeScene
  }
} 

</script>

<style>
*
{
    margin: 0;
    padding: 0;
}

html,
body
{
    height: 100vh;
}

#webgl-canvas
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
    z-index: 0;
}
</style>
