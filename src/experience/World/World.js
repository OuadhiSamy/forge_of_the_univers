import * as THREE from 'three'
import ThreeScene from "../ThreeScene";
import Environment from './Environment';
import Concept from './Concept'

import * as _Math from '../Utils/Math.js'

import baseVertexShader from '../../shaders/base/vertex.js'
import baseFragmentShader from '../../shaders/base/fragment.js'
import lightBeamVertexShader from '../../shaders/lightBeam/vertex.js'
import lightBeamFragmentShader from '../../shaders/lightBeam/fragment.js'
import particleTexture from '../../assets/particle_2.jpg'
import EventEmitter from '../Utils/EventEmitter';

export default class World extends EventEmitter {
    constructor(conceptList) {
        super()

        this.threeScene = new ThreeScene
        this.renderer = this.threeScene.renderer.rendererInstance
        this.scene = this.threeScene.scene
        this.resources = this.threeScene.resources
        this.debug = this.threeScene.debug
        this.camera = this.threeScene.camera
        this.concepts = conceptList
        this.conceptsMesh = []
        
        this.resources.on('ready', () => {
            this.environment = new Environment()
            this.addScene()
            this.addConceptItems()
        })
    }

    /**
     * Particules WIP
     */
    addParticles() {
        // Particles
        const pGeometry = new THREE.PlaneGeometry( 1, 1 )
        const geometry = new THREE.InstancedBufferGeometry()

        let count = 30000
        let minRadius = 2
        let maxRadius = 4

        geometry.instanceCount = count
        geometry.setAttribute('position', pGeometry.getAttribute('position'))
        geometry.index = pGeometry.index

        let pos = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            let theta = Math.random() * 2 * Math.PI


            let r = _Math.lerp(minRadius, maxRadius, Math.random())
            let x = r * Math.sin(theta)
            let y = (Math.random() - 0.5) * 0.2
            let z = r * Math.cos(theta)
            pos.set([ x,y,z], i * 3)
        }

        geometry.setAttribute('pos', new THREE.InstancedBufferAttribute(pos, 3, false))

        // Materials

        const material = new THREE.ShaderMaterial({
            vertexShader: baseVertexShader,
            fragmentShader: baseFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector4 },
                uTexture: {value: new THREE.TextureLoader().load(particleTexture) }
            },
            transparent: true,
            depthTest: false,
        })

        // Mesh
        const plane = new THREE.Mesh(geometry,material)
        this.scene.add(plane)
    }

    /**
     * Add 1, 1, 1 box for scale
     */
    addBox() {
        const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial()
        const box = new THREE.Mesh(boxGeometry,boxMaterial)
        this.scene.add(box)
    }

    /**
     * Torus to mock timeline
     */
    addTorus() {
        const torusGeometry = new THREE.TorusBufferGeometry(20, 1, 64, 64)
        const torusMaterial = new THREE.MeshStandardMaterial()
        const torus = new THREE.Mesh(torusGeometry,torusMaterial)
        torus.scale.set(3, 3, 0.1)
        torus.rotation.x = Math.PI / 2
        this.scene.add(torus)

    
        if(this.debug.active) {
            this.torusFolder = this.debug.ui.addFolder({title: 'Torus', expanded: false})
            this.torusFolder.addInput(torus.scale, 'x', { label: 'Width', min: 1, max: 8 }).on('change', e => torus.scale.x = e.value)
            this.torusFolder.addInput(torus.scale, 'y', { label: 'Height', min: 1, max: 8 }).on('change', e => torus.scale.y = e.value)
            this.torusFolder.addInput(torus.scale, 'z', { label: 'Depth', min: 1, max: 8 }).on('change', e => torus.scale.z = e.value)
        }
    }

    addScene() {
        this.ringsModel = this.resources.items.path.scene
        const ringsTexture = this.resources.items.ringTexture
        ringsTexture.encoding = THREE.sRGBEncoding
        ringsTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        const ringMaterial = new THREE.MeshBasicMaterial(
            {
                map: this.resources.items.ringTexture, 
                side: THREE.DoubleSide, 
                roughness: 0.8, 
                transparent: true
            }
        )
        this.ringsModel.traverse((child) => {child.material = ringMaterial})
        this.ringsModel.scale.set(50, 0, 50)
        this.scene.add(this.ringsModel)

        if(this.debug.active) {
            this.ringsModelFolder = this.debug.ui.addFolder({title: 'RingsModel', expanded: false})
            this.ringsModelFolder.addInput(this.ringsModel.scale, 'x', { label: 'Width', min: 1, max: 200 }).on('change', e => this.ringsModel.scale.x = e.value)
            this.ringsModelFolder.addInput(this.ringsModel.scale, 'y', { label: 'Height', min: 1, max: 200 }).on('change', e => this.ringsModel.scale.y = e.value)
            this.ringsModelFolder.addInput(this.ringsModel.scale, 'z', { label: 'Depth', min: 1, max: 200 }).on('change', e => this.ringsModel.scale.z = e.value)
        }

        const innerRing = this.ringsModel.clone()
        innerRing.scale.set(8, 8, 8)
        innerRing.position.y = -16

        this.scene.add(innerRing)


        // Light beam
        const lbGeometry = new THREE.PlaneBufferGeometry(50, 500)
        const lbMaterial = new THREE.ShaderMaterial({
            vertexShader: lightBeamVertexShader,
            fragmentShader: lightBeamFragmentShader,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new THREE.Vector4 },
                uTexture: {value: new THREE.TextureLoader().load(particleTexture) }
            },
            transparent: true,
            depthTest: false,
        })

        const lightBeam = new THREE.Mesh(lbGeometry,lbMaterial)
        // this.scene.add(lightBeam)
    }

    addConceptItems() {
        // if(this.debug.active) {
        //     this.sphereFolder = this.debug.ui.addFolder({title: 'Sphere', expanded: true})
        //     this.sphereFolder.addInput(this.sphere.position, 'x', { label: 'PosX', min: -200, max: 200, step: 0.1 }).on('change', e => this.sphere.position.x = e.value)
        //     this.sphereFolder.addInput(this.sphere.position, 'y', { label: 'PosY', min: -200, max: 200 }).on('change', e => this.sphere.position.y = e.value)
        //     this.sphereFolder.addInput(this.sphere.position, 'z', { label: 'PosZ', min: -200, max: 200 }).on('change', e => this.sphere.position.z = e.value)
        // }

        for(const el of this.concepts) {
            const concept = new Concept(el)
            this.conceptsMesh.push(concept.mesh)
        }

        document.addEventListener( 'pointermove', (event) => this.onPointerMove(event) );
        document.addEventListener( 'click', (event) => this.onPointerClick(event) );

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2(); 
    }

    onPointerMove( event ) {
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    onPointerClick() {
        if(this.hoveredSphere) {
            const conceptSelectedEvent = new CustomEvent("conceptSelected", {
                detail: {conceptMesh: this.hoveredSphere},
                bubbles: true,
                cancelable: true,
                composed: false,
            });
    
            document.querySelector("#webgl-canvas").dispatchEvent(conceptSelectedEvent);
            // this.camera.moveCameraToMesh(this.hoveredSphere, 0)
        }
        else console.log('No Object hovered')
    }

    focusById(id) {
        // Get mesh by id
        const mesh = this.conceptsMesh[id]
        this.camera.moveCameraToMesh(mesh)
    }

    update() {
        if(this.raycaster) {
            this.raycaster.setFromCamera(this.pointer, this.camera.instanceCamera);
            const intersects = this.raycaster.intersectObjects(this.conceptsMesh);

            intersects.length > 0 ? this.hoveredSphere = intersects[0].object : this.hoveredSphere = null
        }
    }
 }