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
    this.$store.commit('concepts/setConceptList', concepts)
    this.scene = new ThreeScene(this.$refs.canvas, concepts)
    document.querySelector("#webgl-canvas").addEventListener("myevent", (event) => {
      this.$store.commit('concepts/setCurrentConcept', event.detail.conceptId)
    });

  },
  methods: {
    log(e) {
      console.log(e)
    },
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
