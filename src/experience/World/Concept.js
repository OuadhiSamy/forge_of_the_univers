import * as THREE from 'three'
import ThreeScene from "../ThreeScene";

export default class Concept {
    constructor(conceptData) {
        this.threeScene = new ThreeScene
        this.scene = this.threeScene.scene
        this.resources = this.threeScene.resources
        this.conceptData = conceptData

        this.addConceptToScene()
    }

    addConceptToScene() {
        const geometry = new THREE.SphereBufferGeometry( 1, 32, 32 )
        const material = new THREE.MeshBasicMaterial({color: new THREE.Color(this.conceptData.mainColor)})
    
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.set(
            this.conceptData.position.x, 
            this.conceptData.position.y, 
            this.conceptData.position.z
        )

        this.mesh.scale.set(
            this.conceptData.size.x, 
            this.conceptData.size.y, 
            this.conceptData.size.z
        )

        this.scene.add(this.mesh)
    }
}