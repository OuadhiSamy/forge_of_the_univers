import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ThreeScene from './ThreeScene'

export default class Camera {
    constructor () {
        this.threeScene = new ThreeScene ()
        this.sizes = this.threeScene.sizes
        this.scene = this.threeScene.scene
        this.canvas = this.threeScene.canvas
        this.debug = this.threeScene.debug



        this.initInstanceCamera()
        this.initOrbitControls()
    }

    initInstanceCamera() {
        this.instanceCamera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 2000)
        this.instanceCamera.position.set(0, 24, 130)
        
        this.lookAtPoint = new THREE.Mesh(
            new THREE.BoxBufferGeometry(2, 2, 2),
            new THREE.MeshBasicMaterial()
        )

        this.lookAtPoint.visible = false

    
        this.scene.add(this.instanceCamera, this.lookAtPoint)

        if(this.debug.active) {
            this.cameraFolder = this.debug.ui.addFolder({title: 'Camera', expanded: false})
            this.cameraFolder.addInput(this.instanceCamera.position, 'x', { label: 'PosX', min: 0, max: 400 }).on('change', e => this.instanceCamera.position.x = e.value)
            this.cameraFolder.addInput(this.instanceCamera.position, 'y', { label: 'PosY', min: 0, max: 400 }).on('change', e => this.instanceCamera.position.y = e.value)
            this.cameraFolder.addInput(this.instanceCamera.position, 'z', { label: 'PosZ', min: 0, max: 400 }).on('change', e => this.instanceCamera.position.z = e.value)
            this.cameraFolder.addInput(this.instanceCamera, 'far', { label: 'Far', min: 1, max: 5000 }).on('change', e => {this.instanceCamera.far = e.value, this.instanceCamera.updateProjectionMatrix()})
        }

        if(this.debug.active) {
            this.lookAtFolder = this.debug.ui.addFolder({title: 'LookAt', expanded: true})
            this.lookAtFolder.addInput(this.lookAtPoint.position, 'x', { label: 'PosX', min: 0, max: 400 }).on('change', e => this.lookAtPoint.position.x = e.value)
            this.lookAtFolder.addInput(this.lookAtPoint.position, 'y', { label: 'PosY', min: 0, max: 400 }).on('change', e => this.lookAtPoint.position.y = e.value)
            this.lookAtFolder.addInput(this.lookAtPoint.position, 'z', { label: 'PosZ', min: 0, max: 400 }).on('change', e => this.lookAtPoint.position.z = e.value)
        }
    }

    initOrbitControls() {
        this.orbitControls = new OrbitControls(this.instanceCamera, this.canvas)
        this.orbitControls.enableDamping = true
    }

    moveCameraTo(mesh) {
        
        // Create a line between to point
        // const prout = 
        const line = new THREE.Line3(this.instanceCamera.position, mesh.position)
        const positionInLine = line.at(0.95, new THREE.Vector3(1, 1, 1))

        gsap.to(this.lookAtPoint.position, { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z, duration: 1 })
        gsap
            .to(this.instanceCamera.position, { x: positionInLine.x, y: positionInLine.y, z: positionInLine.z, duration: 2 })
            .then(() => this.orbitControls.target.set(...this.lookAtPoint.position))
    }

    resize() {
        this.instanceCamera.aspect = this.sizes.width / this.sizes.height
        this.instanceCamera.updateProjectionMatrix()
    }

    update() {
        this.orbitControls.update()
        this.instanceCamera.lookAt(this.lookAtPoint.position)
    }
}