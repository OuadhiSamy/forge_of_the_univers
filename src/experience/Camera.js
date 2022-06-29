import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ThreeScene from './ThreeScene'

export default class Camera {
    constructor () {
        this.threeScene = new ThreeScene ()
        this.sizes = this.threeScene.sizes
        this.scene = this.threeScene.scene
        this.canvas = this.threeScene.canvas

        this.initInstanceCamera()
        this.initOrbitControls()
    }

    initInstanceCamera() {
        this.instanceCamera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instanceCamera.position.set(6, 4, 8)
        this.scene.add(this.instanceCamera)
    }

    initOrbitControls() {
        this.orbitControls = new OrbitControls(this.instanceCamera, this.canvas)
        this.orbitControls.enableDamping = true
    }

    resize() {
        this.threeScene.aspect = this.sizes.width / this.sizes.height
        this.threeScene.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}