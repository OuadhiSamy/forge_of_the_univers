import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltrLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        this.loaders.dracoLoader = new DRACOLoader()
        // this.loaders.dracoLoader.setDecoderPath( 'three/examples/js/libs/draco/' );
        // this.loaders.dracoLoader.preload();
    }

    startLoading() {
        for(const source of this.sources) {
            if(source.type === 'gltfModel') {

                if(source.compression === 'draco') {
                    this.loaders.dracoLoader.load(source.path, (file) => {this.sourceLoaded(source, file)})
                } else {
                    this.loaders.gltrLoader.load(source.path, (file) => {this.sourceLoaded(source, file)})
                }
            }

            else if(source.type === 'texture') {
                this.loaders.textureLoader.load(source.path, (file) => {this.sourceLoaded(source, file)})
            }

            else if(source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {this.sourceLoaded(source, file)})
            }
        }
     }

     sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded ++

        if(this.loaded === this.toLoad) {
            this.trigger('ready')
        }
     }
    
}