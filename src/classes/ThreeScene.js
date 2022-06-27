import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import baseVertexShader from '../shaders/base/vertex.js'
import baseFragmentShader from '../shaders/base/fragment.js'
 
let instance = null

export default class ThreeScene {
    constructor(canvas) {
        // Singleton
        if(instance){
            return instance
        }
        instance = this
        this.simpleInit(canvas);

    }

    simpleInit (canvas) {
        // Scene
        const scene = new THREE.Scene()

        // Objects
        const geometry = new THREE.PlaneGeometry( 1, 1 );

        // Materials

        const material = new THREE.ShaderMaterial({
            vertexShader: baseVertexShader,
            fragmentShader: baseFragmentShader
        })
        material.color = new THREE.Color(0xff0000)

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
        camera.position.z = 2
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
            // controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }

}