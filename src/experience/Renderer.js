import ThreeScene from './ThreeScene.js'

export default class Renderer
{
    constructor()
    {
        this.threeScene = new ThreeScene()
        this.canvas = this.threeScene.canvas
        this.sizes = this.threeScene.sizes
        this.scene = this.threeScene.scene
        this.camera = this.threeScene.camera

        this.initRendererInstance()
    }

    initRendererInstance() {
        console.log("hey");


        this.rendererInstance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })


        // this.rendererInstance.physicallyCorrectLights = true
        // this.rendererInstance.outputEncoding = THREE.sRGBEncoding
        // this.rendererInstance.toneMapping = THREE.CineonToneMapping
        // this.rendererInstance.toneMappingExposure = 1.75
        // this.rendererInstance.shadowMap.enabled = true
        // this.rendererInstance.shadowMap.type = THREE.PCFSoftShadowMap
        // this.rendererInstance.setSize(this.sizes.width, this.sizes.height)
        // this.rendererInstance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    // resize() {
    //     this.rendererInstance.setSize(this.sizes.width, this.sizes.height)
    //     this.rendererInstance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    // }
}