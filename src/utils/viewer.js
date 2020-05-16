import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

let sceneRef = null
export const setSceneRef = ref => {
  sceneRef = ref
}
export const getSceneRef = () => {
  return sceneRef
}
export const resizeToFit = () => {
  if (getSceneRef()) {
    getSceneRef().onWindowResize()
  }
}

THREE.Object3D.DefaultUp.set(0, 0, 1)

let sceneWidth, sceneHeight, aspect

class Viewer {
  transformControls
  focusJoint = 2

  constructor(
    options = {
      container: '',
      enableStats: false
    }
  ) {
    this.options = options

    // Where to render
    this.container = document.getElementById(this.options.container)
    if (!this.container) {
      throw Error('Undefined container for viewer!')
    }

    sceneWidth = this.container.clientWidth
    sceneHeight = this.container.clientHeight
    aspect = sceneWidth / sceneHeight

    // Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xbfd1e5)
    this.windowOffset = 0

    // Camera
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
    this.camera.position.set(300, -300, 200)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(sceneWidth, sceneHeight)
    this.renderer.setClearColor(0x000000, 1)
    this.container.appendChild(this.renderer.domElement)

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableKeys = false

    // Callbacks
    window.addEventListener('resize', this.onWindowResize)
    this.controls.addEventListener('change', this.onControlsChange)
    document.addEventListener('keydown', this.handleKeyDown)

    // Grid
    let gridHelper = new THREE.GridHelper(200, 20)
    gridHelper.rotateX(Math.PI / 2)
    gridHelper.position.z = -0.01
    this.scene.add(gridHelper)

    // Lights
    let lights = []
    lights[0] = new THREE.PointLight(0xffffff, 1, 0)
    lights[0].position.set(0, -500, 0)
    lights[1] = new THREE.AmbientLight(0xaaaaaa)
    lights.forEach(light => {
      this.scene.add(light)
    })

    // Stats
    if (this.options.enableStats) {
      this.initStats()
    }

    // Models
    let loader = new STLLoader()
    loader.load('./model.stl', this.STLLoadMesh)

    // Draw once
    this.draw()
  }

  removeListener = () => {
    window.removeEventListener('resize', this.onWindowResize, false)
    this.controls.removeEventListener('change', this.onControlsChange, false)
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  onWindowResize = () => {
    sceneWidth = this.container.clientWidth
    sceneHeight = this.container.clientHeight
    aspect = sceneWidth / sceneHeight
    // Update renderer
    this.renderer.setSize(sceneWidth, sceneHeight, false)
    // Update camera
    this.camera.aspect = aspect
    this.camera.updateProjectionMatrix()
  }

  changeWindowOffset = offset => {
    this.windowOffset = offset
  }

  draw = () => {
    this.animate()
  }

  render = () => {
    this.renderer.setViewport(0, 0, sceneWidth, sceneHeight)
    this.renderer.render(this.scene, this.camera)
  }

  animate = () => {
    this.render()
    this.stats && this.stats.update()
    requestAnimationFrame(this.animate) // Recursive async render call
  }

  onControlsChange = () => {
    this.render()
  }

  initStats = () => {
    this.stats = this.createStats()
    this.container.appendChild(this.stats.domElement)
  }

  createStats = () => {
    const stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = 'auto'
    stats.domElement.style.top = '0'
    stats.domElement.style.right = '0'
    return stats
  }

  STLLoadMesh = geometry => {
    let material = new THREE.MeshNormalMaterial()
    let mesh = new THREE.Mesh(geometry, material)
    this.scene.add(mesh)
  }

  handleKeyDown = e => {
    switch (e.keyCode) {
      default:
        break
    }
  }
}

export default Viewer
