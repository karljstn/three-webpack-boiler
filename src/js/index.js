import AssetsManager from './utils/AssetsManager'
import Manager from './Manager'
import '../styles/styles.scss'

document.addEventListener('DOMContentLoaded', () => {
    AssetsManager.loadAssets().then(() => {
        Manager.setup()
    })
})
