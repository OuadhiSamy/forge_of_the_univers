<template>
  <div>
    <canvas id="webgl-canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import ThreeScene from '../classes/ThreeScene'

export default {
  name: ThreeScene,
  data () {
    return {
      scene: null,
    };
  },
  mounted () {
    this.scene = new ThreeScene(this.$refs.canvas);
  } 
}

</script>
