import Stats from 'three/examples/jsm/libs/stats.module'
import { Pane } from 'tweakpane';

import ThreeScene from '../ThreeScene.js'

export default class Debug {
    constructor() {
        this.threeScene = new ThreeScene()

        this.active = window.location.hash === '#debug'
        
        if(this.active) {
           // Stats         
            this.stats = new Stats()
            document.body.appendChild(this.stats.dom)
            
            this.ui = new Pane()
        }
    }

    update() {
        //Stats update
        this.stats.update()
    }

    destroy() {
        this.ui.dispose()
    }
}