import * as THREE from 'three'
import ThreeScene from './ThreeScene.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export default class Renderer
{
    constructor()
    {
        this.threeScene = new ThreeScene()
        this.canvas = this.threeScene.canvas
        this.sizes = this.threeScene.sizes
        this.scene = this.threeScene.scene
        this.camera = this.threeScene.camera
        this.debug = this.threeScene.debug

        this.initRendererInstance()
    }

    initRendererInstance () {
        const params = {
            exposure: 1,
            bloomStrength: 1.5,
            bloomThreshold: 0,
            bloomRadius: 0
        };

        this.rendererInstance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        this.rendererInstance.physicallyCorrectLights = true
        this.rendererInstance.outputEncoding = THREE.sRGBEncoding
        this.rendererInstance.toneMapping = THREE.ReinhardToneMapping
        this.rendererInstance.toneMappingExposure = params.exposure
        this.rendererInstance.shadowMap.enabled = true
        this.rendererInstance.shadowMap.type = THREE.PCFSoftShadowMap
        this.rendererInstance.setSize(this.sizes.width, this.sizes.height)
        this.rendererInstance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
        this.rendererInstance.outputEncoding = THREE.sRGBEncoding

        const renderScene = new RenderPass(this.scene, this.camera.instanceCamera);
        const bloomPass = new UnrealBloomPass( new THREE.Vector2(this.sizes.width, this.sizes.height), 1.5, 0.4, 0.85 );
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;

        this.composer = new EffectComposer(this.rendererInstance);
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);


        if(this.debug.active) {
            this.bloomPass = this.debug.ui.addFolder({title: 'Bloom', expanded: true})
            this.bloomPass.addInput(this.rendererInstance, 'toneMappingExposure', { label: 'Exposure', min: 0.1, max: 2 }).on('change', e => this.rendererInstance.toneMappingExposure = Math.pow(e.value, 4.0))
            this.bloomPass.addInput(params, 'bloomStrength', { label: 'bloomStrength', min: 0.0, max: 3 }).on('change', e => bloomPass.strength = Number(e.value))
            this.bloomPass.addInput(params, 'bloomThreshold', { label: 'bloomThreshold', min: 0.0, max: 1 }).on('change', e => bloomPass.threshold = Number(e.value))
            this.bloomPass.addInput(params, 'bloomRadius', { label: 'bloomRadius', min: 0.0, max: 1 }).on('change', e => bloomPass.radius = Number(e.value))
        }

    }

    resize() {
        this.rendererInstance.setSize(this.sizes.width, this.sizes.height)
        this.rendererInstance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update() {
        this.composer.render();
        // this.rendererInstance.render(this.scene, this.camera.instanceCamera)
    }
}