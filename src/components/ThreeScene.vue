<template>
  <div>
    <canvas id="webgl-canvas" ref="canvas"></canvas>
  </div>
</template>

<script>
import ThreeScene from '../experience/ThreeScene'

export default {
  name: ThreeScene,
  data () {
    return {
      scene: null,
    };
  },
  mounted () {
    // this.scene = new ThreeScene(this.$refs.canvas);
  },
  methods: {
    stop() {
      console.log('stop')
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
