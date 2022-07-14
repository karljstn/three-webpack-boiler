import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import gsap from 'gsap'
import AssetsManager from './utils/AssetsManager'

import Cube from './components/Cube'

const FPS = 60

class Manager extends THREE.EventDispatcher {
    constructor() {
        super()
        this.canvas = document.getElementById('canvas')
        // gsap.ticker.fps(FPS)
    }

    setup() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.setupScene()
        this.setupCamera()
        this.setupRenderer()

        this.setupStats()
        this.setupControls()

        this.setupEvents()

        this.addObjects()
    }

    addObjects() {
        this.cube = new Cube()
        this.scene.add(this.cube)
    }

    setupScene() {
        this.scene = new THREE.Scene()
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.width / this.height,
            0.1,
            5000
        )

        this.camera.position.z = 5
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            // alpha: true
        })
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.canvas)
    }

    setupStats() {
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)
    }

    setupEvents() {
        gsap.ticker.add((time, deltaTime, frame) =>
            this.tick(time, deltaTime, frame)
        )
        window.addEventListener('resize', () => this.onResize())
    }

    onResize() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1, 2))
    }

    tick(time, deltaTime, frame) {
        this.stats.begin()

        this.renderer.render(this.scene, this.camera)

        this.stats.end()
    }
}

export default new Manager()
