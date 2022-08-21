<template>
  <div>
    <canvas id="webgl-canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import ThreeScene from '../experience/ThreeScene'
import concepts from '../concepts.js'

export default {
  name: 'ThreeScene',
  data () {
    return {
      scene: null,
    };
  },
  mounted () {
    // this.scene = new ThreeScene(this.$refs.canvas, concepts);
  },
  methods: {
    stop() {
      this.scene.destroy()
    }
  },
  // clean up
  // beforeUnmount () {
  //   console.log('Clear ThreeInstance')
  //   this.stop()
  // }
}

</script>
