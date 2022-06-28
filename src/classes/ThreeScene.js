import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import baseVertexShader from '../shaders/base/vertex.js'
import baseFragmentShader from '../shaders/base/fragment.js'
import particleTexture from '../assets/particle_2.jpg'
 
let instance = null

export default class ThreeScene {
    constructor(canvas) {
        // Singleton
        if(instance){
            return instance
        }
        instance = this

        this.simpleInit(canvas)

    }

    lerp (a, b, t) {
        return a * (1 - t ) + b * t
    }

    simpleInit (canvas) {
        // Scene
        const scene = new THREE.Scene()

        // Stats
        const stats = Stats()
        console.log("stats", stats);
        document.body.appendChild(stats.dom)

        //Object
        const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1)
        const boxMaterial = new THREE.MeshBasicMaterial()
        boxMaterial.color = new THREE.Color(0xff0000)
        const box = new THREE.Mesh(boxGeometry,boxMaterial)
        // scene.add(box)

        // Particules
        const pGeometry = new THREE.PlaneGeometry( 1, 1 )
        const geometry = new THREE.InstancedBufferGeometry()

        let count = 30000
        let minRadius = 1
        let maxRadius = 4

        geometry.instanceCount = count
        geometry.setAttribute('position', pGeometry.getAttribute('position'))
        geometry.index = pGeometry.index

        let pos = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            let theta = Math.random() * 2 * Math.PI


            let r = this.lerp(minRadius, maxRadius, Math.random())
            let x = r * Math.sin(theta)
            let y = (Math.random() - 0.5) * 2
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
        scene.add(plane)

        // Lights

        const pointLight = new THREE.PointLight(0xffffff, 0.1)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        scene.add(pointLight)

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () =>
        {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Camera
         */
        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 4
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Animate
         */

        const clock = new THREE.Clock()

        const tick = () =>
        {

            const elapsedTime = clock.getElapsedTime()

            // Update objects
            // plane.rotation.y = .5 * elapsedTime

            // Update Orbital Controls
            controls.update()

            // Render
            renderer.render(scene, camera)

            //Stats update
            stats.update()

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }

}