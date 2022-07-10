import * as THREE from 'three'
import ThreeScene from "../ThreeScene";

export default class Environment {
    constructor() {
        this.threeScene = new ThreeScene
        this.scene = this.threeScene.scene
        this.resources = this.threeScene.resources

        this.setLights()
        this.setEnnvironmentMap()
        
    }

    setLights() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, - 2.25)
        this.scene.add(this.sunLight)
    }

    setEnnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.25
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()
    }
}