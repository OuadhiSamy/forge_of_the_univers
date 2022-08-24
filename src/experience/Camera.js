import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ThreeScene from './ThreeScene'
import EventEmitter from './Utils/EventEmitter'

export default class Camera extends EventEmitter {
    constructor () {
        super()
        
        this.threeScene = new ThreeScene ()
        this.sizes = this.threeScene.sizes
        this.scene = this.threeScene.scene
        this.canvas = this.threeScene.canvas
        this.debug = this.threeScene.debug

        this.lookAtPoint = null
        this.focusedMesh = null

        this.initInstanceCamera()
        this.initOrbitControls()
    }

    initInstanceCamera() {
        this.instanceCamera = new THREE.PerspectiveCamera(95, this.sizes.width / this.sizes.height, 0.1, 2000)
        this.instanceCamera.position.set(0, 86, 255)
        
        this.lookAtPoint = new THREE.Mesh(
            new THREE.BoxBufferGeometry(0.5, 0.5, 0.5),
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
    }

    initOrbitControls() {
        this.orbitControls = new OrbitControls(this.instanceCamera, this.canvas)
        this.orbitControls.enableDamping = true
        this.orbitControls.minDistance = 10;
        this.orbitControls.maxDistance = 200;
    }

    moveCameraTo(mesh) {

        console.log(mesh)

        const myEvent = new CustomEvent("myevent", {
            detail: {conceptId: mesh.userData.conceptId},
            bubbles: true,
            cancelable: true,
            composed: false,
        });

        document.querySelector("#webgl-canvas").dispatchEvent(myEvent);

        if(this.focusedMesh === null || this.focusedMesh.id !== mesh.id) {

            this.focusedMesh = mesh

            const line = new THREE.Line3(this.instanceCamera.position, this.focusedMesh.position)
            const positionInLine = line.at(0.95, new THREE.Vector3(1, 1, 1))

            gsap.to(this.lookAtPoint.position, { x: this.focusedMesh.position.x, y: this.focusedMesh.position.y, z: this.focusedMesh.position.z, duration: 0.8 })
            gsap
                .to(this.instanceCamera.position, { x: positionInLine.x, y: positionInLine.y, z: positionInLine.z, duration: 1 })
                .then(() => this.orbitControls.target.set(...this.lookAtPoint.position))
        }

        
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