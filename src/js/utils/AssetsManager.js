import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import AnimationManager from './AnimationManager'

const ASSETS = {
    models: {},
    sounds: {},
    textures: {},
}

class AssetsManager {
    constructor() {
        this._promises = []

        this._gltfLoader = new GLTFLoader()
        this._textureLoader = new THREE.TextureLoader()
    }

    loadAssets() {
        this._loadTextures()
        this._loadModels()
        this._loadSounds()

        return Promise.all(this._promises)
    }

    _loadTextures() {
        let textureCache = []

        this.importAll(
            require.context(
                '../../assets/textures/',
                true,
                /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i
            ),
            textureCache
        )

        for (const texture in textureCache) {
            let promise = new Promise((resolve, reject) => {
                this._textureLoader.load(
                    textureCache[texture].file.default,
                    resolve
                )
                ASSETS.textures[textureCache[texture].name] = {}
            }).then((result) => {
                result.encoding = THREE.sRGBEncoding
                result.flipY = false
                ASSETS.textures[textureCache[texture].name] = result
            })
            this._promises.push(promise)
        }
        for (const texture in this._additionalTextures) {
            if (!this._additionalTextures[texture]) return
            let promise = new Promise((resolve, reject) => {
                this._textureLoader.load(
                    this._additionalTextures[texture],
                    resolve
                )
                ASSETS.textures[texture] = {}
            }).then((result) => {
                result.encoding = THREE.sRGBEncoding
                result.flipY = false
                ASSETS.textures[texture] = result
            })

            this._promises.push(promise)
        }
    }

    _loadModels() {
        let modelCache = []

        this.importAll(
            require.context('../../assets/models/', true, /\.(?:glb|gltf)$/i),
            modelCache
        )

        for (const model in modelCache) {
            let promise = new Promise((resolve, reject) => {
                this._gltfLoader.load(modelCache[model].file.default, resolve)
                ASSETS.models[modelCache[model].name] = {}
            }).then((result) => {
                if (result.animations[0]) {
                    result.animationManager = new AnimationManager({
                        model: result,
                        animations: result.animations,
                    })
                }
                ASSETS.models[modelCache[model].name] = result
            })
            this._promises.push(promise)
        }
    }

    _loadSounds() {
        let soundCache = []

        this.importAll(
            require.context(
                '../../assets/sounds/',
                true,
                /\.(?:ogg|mp3|wav|mpe?g)$/i
            ),
            soundCache
        )

        for (const sound in soundCache) {
            let promise = new Promise((resolve, reject) => {
                new THREE.AudioLoader().load(
                    soundCache[sound].file.default,
                    resolve
                )
                ASSETS.sounds[soundCache[sound].name] = {}
            }).then((result) => {
                ASSETS.sounds[soundCache[sound].name] = result
            })
            this._promises.push(promise)
        }
    }

    get GLTFLoader() {
        return this._gltfLoader
    }

    get TextureLoader() {
        return this._textureLoader
    }

    get models() {
        return ASSETS.models
    }

    get textures() {
        return ASSETS.textures
    }

    importAll(r, cache) {
        r.keys().forEach((key) => {
            const m = key.match(/([^:\\/]*?)(?:\.([^ :\\/.]*))?$/)
            const fileName = m === null ? '' : m[1]
            cache[key] = {
                file: r(key),
                name: fileName,
            }
        })
    }
}

export default new AssetsManager()
