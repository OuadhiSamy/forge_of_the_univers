import * as THREE from 'three'
import ThreeScene from "../ThreeScene";
import Environment from './Environment';

import * as _Math from '../Utils/Math.js'

import baseVertexShader from '../../shaders/base/vertex.js'
import baseFragmentShader from '../../shaders/base/fragment.js'
import particleTexture from '../../assets/particle_2.jpg'

export default class World {
    constructor() {
        this.threeScene = new ThreeScene
        this.scene = this.threeScene.scene
        this.resources = this.threeScene.resources
        this.debug = this.threeScene.debug
        
        this.scene.background = new THREE.Color( 0x121212 );

        //Object
        const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshStandardMaterial()
        const box = new THREE.Mesh(boxGeometry,boxMaterial)
        this.scene.add(box)

    
        if(this.debug.active) {
            this.boxFolder = this.debug.ui.addFolder({title: 'Box', expanded: true})
            this.boxFolder.addInput(box.scale, 'x', { label: 'Width', min: 1, max: 8 }).on('change', e => box.scale.x = e.value)
            this.boxFolder.addInput(box.scale, 'y', { label: 'Height', min: 1, max: 8 }).on('change', e => box.scale.y = e.value)
            this.boxFolder.addInput(box.scale, 'z', { label: 'Depth', min: 1, max: 8 }).on('change', e => box.scale.z = e.value)
        }


        this.resources.on('ready', () => {
            //Lights
            this.environment = new Environment()
        })


        this.addParticles() 
    
    }

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
 }