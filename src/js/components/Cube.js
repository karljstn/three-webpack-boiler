import * as THREE from 'three'
import fragmentShader from '../../shaders/template/fragment.glsl'
import vertexShader from '../../shaders/template/vertex.glsl'

export default class Cube extends THREE.Object3D {
    constructor() {
        super()
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshNormalMaterial()

        this.cube = new THREE.Mesh(this.geometry, this.material)

        this.add(this.cube)
    }
}
