import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const gui = new GUI()

if (window.location.search === '?debug') {
    gui.show()
} else {
    gui.hide()
}

export default gui
