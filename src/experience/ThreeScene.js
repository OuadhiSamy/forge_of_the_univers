import * as THREE from 'three'

// import EventEmitter from './Utils/EventEmitter.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import Debug from './Utils/Debug.js'
import sources from './sources.js'
 
let instance = null

export default class ThreeScene {
    constructor(canvas) {

        // Singleton
        if(instance) {
            return instance
        }

        instance = this

        this.canvas = canvas
        
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.World = new World()
        

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
        this.debug.update()

    }

    destroy() {
        
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.orbitControls.dispose()
        this.renderer.rendererInstance.dispose()
        
        if(this.debug.active) {
            this.debug.destroy()
        }

        
    }

    simpleInit (canvas) {
        // Scene
        const scene = new THREE.Scene()

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

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    }

}