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
    this.camera.position.set(200, -200, 200)

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
    let gridHelper = new THREE.GridHelper(200, 2)
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

    // Tests
    this.addPointCloud()

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

  addPointToCloud = (x, y, z, color) => {
    let geometry = new THREE.SphereGeometry(0.5, 12, 0)
    let material = new THREE.MeshLambertMaterial({
      color: color || 0xff0077
    })
    let sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(x, y, z)
    this.scene.add(sphere)
  }

  addLineToScene = (p1, p2, color) => {
    var points = []
    points.push(p1)
    points.push(p2)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({
      color: color || 0x0000ff
    })
    var line = new THREE.Line(geometry, material)
    this.scene.add(line)
  }

  addTriangleToScene = (p1, p2, p3, color) => {
    var points = []
    points.push(p1)
    points.push(p2)
    points.push(p3)
    points.push(p1)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({
      color: color || 0x0000ff
    })
    var line = new THREE.Line(geometry, material)
    this.scene.add(line)
  }

  estimate3DCircle3Points = (pp1, pp2, pp3) => {
    let origin = new THREE.Vector3(0, 0, 0)
    let p1 = pp1 || new THREE.Vector3()
    let p2 = pp2 || new THREE.Vector3()
    let p3 = pp3 || new THREE.Vector3()
    let v1 = new THREE.Vector3().subVectors(p2, p1)
    let v2 = new THREE.Vector3().subVectors(p3, p1)

    // if () {
    //   console.error('Points are colinear!')
    //   return
    // }

    let v1check = new THREE.Vector3().copy(v1).normalize()
    let v2check = new THREE.Vector3().copy(v2).normalize()
    let v12check = new THREE.Vector3().crossVectors(v1check, v2check)

    if (v12check.length() < 1e-4) {
      console.error('Points are nearly colinear!')
      return
    }

    let v11 = v1.dot(v1)
    let v22 = v2.dot(v2)
    let v12 = v1.dot(v2)

    let b = 0.5 / (v11 * v22 - v12 * v12)
    let k1 = b * v22 * (v11 - v12)
    let k2 = b * v11 * (v22 - v12)

    let p0 = new THREE.Vector3()
    p0.setX(p1.x + k1 * v1.x + k2 * v2.x)
    p0.setY(p1.y + k1 * v1.y + k2 * v2.y)
    p0.setZ(p1.z + k1 * v1.z + k2 * v2.z)

    let radius = p0.distanceTo(p1)

    this.addPointToCloud(p1.x, p1.y, p1.z)
    this.addPointToCloud(p2.x, p2.y, p2.z)
    this.addPointToCloud(p3.x, p3.y, p3.z)
    this.addPointToCloud(p0.x, p0.y, p0.z)
    this.addTriangleToScene(p1, p2, p3, 0x000fff)
    console.log(p1)
    console.log(p2)
    console.log(p3)
    console.log(p0)
    console.log(radius)
    console.log(p0.distanceTo(p1))
    console.log(p0.distanceTo(p2))
    console.log(p0.distanceTo(p3))

    p1.sub(p0)
    p2.sub(p0)
    p3.sub(p0)

    let normal = new THREE.Vector3().crossVectors(v1, v2).normalize()
    let xynormal = new THREE.Vector3(0, 0, 1).normalize()
    let axis = new THREE.Vector3().crossVectors(normal, xynormal).normalize()
    let angle = normal.angleTo(xynormal)
    let quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle)
    let quaternionBack = new THREE.Quaternion().copy(quaternion).inverse()

    let p1new = new THREE.Vector3().copy(p1).applyQuaternion(quaternion)
    let p2new = new THREE.Vector3().copy(p2).applyQuaternion(quaternion)
    let p3new = new THREE.Vector3().copy(p3).applyQuaternion(quaternion)

    this.addLineToScene(origin, normal, 0xff0000)
    this.addLineToScene(origin, xynormal, 0xffff00)
    this.addLineToScene(origin, axis)
    this.addPointToCloud(p1new.x, p1new.y, p1new.z, 0xfff000)
    this.addPointToCloud(p2new.x, p2new.y, p2new.z, 0xfff000)
    this.addPointToCloud(p3new.x, p3new.y, p3new.z, 0xfff000)
    this.addPointToCloud(origin.x, origin.y, origin.z, 0xfff000)
    this.addTriangleToScene(p1new, p2new, p3new, 0xfff000)
    console.log(origin.distanceTo(p1new))
    console.log(origin.distanceTo(p2new))
    console.log(origin.distanceTo(p3new))

    p1.add(p0)
    p2.add(p0)
    p3.add(p0)

    const M_2PI = Math.PI * 2
    const DEG2RAD = M_2PI / 360
    const STEP = DEG2RAD * 2

    // let Q = new THREE.Quaternion().setFromAxisAngle(normal, STEP)
    // let p = new THREE.Vector3().copy(p1)
    // for (let i = 0; i < M_2PI; i += STEP) {
    //   p.sub(p0)
    //   p.applyQuaternion(Q)
    //   p.add(p0)
    //   this.addPointToCloud(p.x, p.y, p.z, 0xf00f0f)
    // }

    for (let i = 0; i < M_2PI; i += STEP) {
      let pp = new THREE.Vector3()
      pp.set(radius * Math.cos(i), radius * Math.sin(i), 0)
      pp.applyQuaternion(quaternionBack)
      pp.add(p0)
      this.addPointToCloud(pp.x, pp.y, pp.z, 0x00ff00)
    }
  }

  addPointCloud = () => {
    const points = [
      { x: 60.0, y: -30.0, z: -40.0 },
      { x: 20.0, y: 155.0, z: 25.0 },
      { x: -30.0, y: 100.0, z: -123.0 },
      { x: 23.277536, y: 69.211195, z: -36.891842 },
      { x: 74.691021, y: 48.247284, z: 53.209375 },
      { x: 73.928071, y: 51.671812, z: 54.365786 },
      { x: 73.103412, y: 55.117709, z: 55.411013 },
      { x: 72.218047, y: 58.580776, z: 56.343784 },
      { x: 71.273056, y: 62.056795, z: 57.162961 },
      { x: 70.26959, y: 65.541531, z: 57.867547 },
      { x: 69.208871, y: 69.030737, z: 58.456684 },
      { x: 68.092192, y: 72.520163, z: 58.929652 },
      { x: 66.920913, y: 76.005558, z: 59.285877 },
      { x: 65.696461, y: 79.482675, z: 59.524925 },
      { x: 64.420328, y: 82.947278, z: 59.646503 },
      { x: 63.09407, y: 86.395146, z: 59.650464 },
      { x: 61.719301, y: 89.822077, z: 59.536803 },
      { x: 60.297696, y: 93.223897, z: 59.305659 },
      { x: 58.830989, y: 96.596462, z: 58.957313 },
      { x: 57.320964, y: 99.935661, z: 58.49219 },
      { x: 55.769464, y: 103.237428, z: 57.910856 },
      { x: 54.178376, y: 106.497739, z: 57.214019 },
      { x: 52.549641, y: 109.712622, z: 56.402529 },
      { x: 50.885243, y: 112.878161, z: 55.477374 },
      { x: 49.187208, y: 115.990498, z: 54.439681 },
      { x: 47.457607, y: 119.045841, z: 53.290715 },
      { x: 45.698546, y: 122.040469, z: 52.031876 },
      { x: 43.912168, y: 124.970732, z: 50.664696 },
      { x: 42.10065, y: 127.833061, z: 49.190843 },
      { x: 40.266199, y: 130.623968, z: 47.612111 },
      { x: 38.411051, y: 133.340053, z: 45.930424 },
      { x: 36.537464, y: 135.978007, z: 44.14783 },
      { x: 34.647722, y: 138.534616, z: 42.266503 },
      { x: 32.744127, y: 141.006766, z: 40.288733 },
      { x: 30.828999, y: 143.391443, z: 38.21693 },
      { x: 28.90467, y: 145.685743, z: 36.053619 },
      { x: 26.973486, y: 147.88687, z: 33.801435 },
      { x: 25.037799, y: 149.992144, z: 31.463123 },
      { x: 23.099967, y: 151.998998, z: 29.04153 },
      { x: 21.162351, y: 153.904988, z: 26.539608 },
      { x: 19.227312, y: 155.707792, z: 23.960404 },
      { x: 17.297208, y: 157.405213, z: 21.307061 },
      { x: 15.374391, y: 158.995183, z: 18.582812 },
      { x: 13.461201, y: 160.475765, z: 15.790975 },
      { x: 11.559972, y: 161.845155, z: 12.934953 },
      { x: 9.673019, y: 163.101686, z: 10.018224 },
      { x: 7.80264, y: 164.243825, z: 7.044342 },
      { x: 5.951116, y: 165.270181, z: 4.016931 },
      { x: 4.1207, y: 166.179504, z: 0.93968 },
      { x: 2.313625, y: 166.970687, z: -2.183664 },
      { x: 0.532091, y: 167.642764, z: -5.349295 },
      { x: -1.221731, y: 168.194918, z: -8.553355 },
      { x: -2.945705, y: 168.626475, z: -11.791941 },
      { x: -4.63773, y: 168.936911, z: -15.061108 },
      { x: -6.295744, y: 169.125845, z: -18.356872 },
      { x: -7.917728, y: 169.19305, z: -21.675218 },
      { x: -9.501705, y: 169.138441, z: -25.012103 },
      { x: -11.045745, y: 168.962087, z: -28.363461 },
      { x: -12.547969, y: 168.664202, z: -31.725211 },
      { x: -14.006544, y: 168.245148, z: -35.093255 },
      { x: -15.419694, y: 167.705437, z: -38.46349 },
      { x: -16.785698, y: 167.045726, z: -41.831811 },
      { x: -18.10289, y: 166.266818, z: -45.194112 },
      { x: -19.369668, y: 165.369663, z: -48.546299 },
      { x: -20.584486, y: 164.355354, z: -51.884287 },
      { x: -21.745865, y: 163.225126, z: -55.204009 },
      { x: -22.852389, y: 161.980357, z: -58.50142 },
      { x: -23.902712, y: 160.622563, z: -61.772503 },
      { x: -24.895553, y: 159.153398, z: -65.013273 },
      { x: -25.829702, y: 157.574653, z: -68.219781 },
      { x: -26.704022, y: 155.88825, z: -71.388121 },
      { x: -27.517447, y: 154.096245, z: -74.514433 },
      { x: -28.268986, y: 152.20082, z: -77.594907 },
      { x: -28.957723, y: 150.204285, z: -80.625791 },
      { x: -29.58282, y: 148.109073, z: -83.603392 },
      { x: -30.143515, y: 145.917736, z: -86.524082 },
      { x: -30.639124, y: 143.632943, z: -89.384303 },
      { x: -31.069045, y: 141.257479, z: -92.18057 },
      { x: -31.432752, y: 138.794238, z: -94.909475 },
      { x: -31.729803, y: 136.246221, z: -97.567696 },
      { x: -31.959836, y: 133.616532, z: -100.151992 },
      { x: -32.122571, y: 130.908374, z: -102.659216 },
      { x: -32.21781, y: 128.125049, z: -105.086312 },
      { x: -32.245436, y: 125.269945, z: -107.430323 },
      { x: -32.205416, y: 122.346543, z: -109.688395 },
      { x: -32.097798, y: 119.358404, z: -111.857775 },
      { x: -31.922714, y: 116.309168, z: -113.93582 },
      { x: -31.680377, y: 113.20255, z: -115.919999 },
      { x: -31.371083, y: 110.042336, z: -117.807895 },
      { x: -30.995207, y: 106.832375, z: -119.597207 },
      { x: -30.553208, y: 103.576579, z: -121.285755 },
      { x: -30.045625, y: 100.278914, z: -122.871482 },
      { x: -29.473076, y: 96.943397, z: -124.352457 },
      { x: -28.836259, y: 93.574093, z: -125.726874 },
      { x: -28.135948, y: 90.175107, z: -126.993059 },
      { x: -27.372999, y: 86.750579, z: -128.149469 },
      { x: -26.548339, y: 83.304682, z: -129.194697 },
      { x: -25.662974, y: 79.841615, z: -130.127467 },
      { x: -24.717983, y: 76.365596, z: -130.946645 },
      { x: -23.714517, y: 72.88086, z: -131.651231 },
      { x: -22.653798, y: 69.391654, z: -132.240367 },
      { x: -21.537119, y: 65.902227, z: -132.713336 },
      { x: -20.36584, y: 62.416833, z: -133.069561 },
      { x: -19.141388, y: 58.939716, z: -133.308608 },
      { x: -17.865256, y: 55.475113, z: -133.430186 },
      { x: -16.538997, y: 52.027245, z: -133.434147 },
      { x: -15.164228, y: 48.600314, z: -133.320487 },
      { x: -13.742624, y: 45.198494, z: -133.089343 },
      { x: -12.275916, y: 41.825929, z: -132.740997 },
      { x: -10.765892, y: 38.486729, z: -132.275873 },
      { x: -9.214391, y: 35.184963, z: -131.694539 },
      { x: -7.623304, y: 31.924652, z: -130.997702 },
      { x: -5.994569, y: 28.709769, z: -130.186212 },
      { x: -4.33017, y: 25.54423, z: -129.261057 },
      { x: -2.632136, y: 22.431893, z: -128.223365 },
      { x: -0.902534, y: 19.37655, z: -127.074399 },
      { x: 0.856527, y: 16.381922, z: -125.815559 },
      { x: 2.642905, y: 13.451659, z: -124.44838 },
      { x: 4.454422, y: 10.58933, z: -122.974526 },
      { x: 6.288873, y: 7.798423, z: -121.395794 },
      { x: 8.144022, y: 5.082337, z: -119.714107 },
      { x: 10.017609, y: 2.444383, z: -117.931514 },
      { x: 11.907351, y: -0.112226, z: -116.050186 },
      { x: 13.810945, y: -2.584375, z: -114.072416 },
      { x: 15.726074, y: -4.969052, z: -112.000613 },
      { x: 17.650402, y: -7.263352, z: -109.837302 },
      { x: 19.581587, y: -9.46448, z: -107.585119 },
      { x: 21.517274, y: -11.569753, z: -105.246806 },
      { x: 23.455106, y: -13.576607, z: -102.825213 },
      { x: 25.392722, y: -15.482597, z: -100.323291 },
      { x: 27.32776, y: -17.285401, z: -97.744087 },
      { x: 29.257864, y: -18.982822, z: -95.090744 },
      { x: 31.180682, y: -20.572792, z: -92.366495 },
      { x: 33.093871, y: -22.053374, z: -89.574658 },
      { x: 34.995101, y: -23.422765, z: -86.718636 },
      { x: 36.882054, y: -24.679295, z: -83.801907 },
      { x: 38.752432, y: -25.821434, z: -80.828026 },
      { x: 40.603957, y: -26.84779, z: -77.800615 },
      { x: 42.434372, y: -27.757114, z: -74.723363 },
      { x: 44.241447, y: -28.548296, z: -71.600019 },
      { x: 46.022982, y: -29.220373, z: -68.434389 },
      { x: 47.776804, y: -29.772527, z: -65.230328 },
      { x: 49.500777, y: -30.204085, z: -61.991742 },
      { x: 51.192802, y: -30.51452, z: -58.722576 },
      { x: 52.850816, y: -30.703455, z: -55.426812 },
      { x: 54.4728, y: -30.770659, z: -52.108466 },
      { x: 56.056777, y: -30.71605, z: -48.771581 },
      { x: 57.600818, y: -30.539696, z: -45.420222 },
      { x: 59.103041, y: -30.241811, z: -42.058473 },
      { x: 60.561616, y: -29.822757, z: -38.690429 },
      { x: 61.974767, y: -29.283046, z: -35.320193 },
      { x: 63.34077, y: -28.623335, z: -31.951873 },
      { x: 64.657963, y: -27.844427, z: -28.589571 },
      { x: 65.92474, y: -26.947272, z: -25.237384 },
      { x: 67.139558, y: -25.932963, z: -21.899396 },
      { x: 68.300937, y: -24.802735, z: -18.579675 },
      { x: 69.407462, y: -23.557966, z: -15.282264 },
      { x: 70.457785, y: -22.200172, z: -12.01118 },
      { x: 71.450626, y: -20.731007, z: -8.77041 },
      { x: 72.384775, y: -19.152262, z: -5.563902 },
      { x: 73.259095, y: -17.465859, z: -2.395562 },
      { x: 74.072519, y: -15.673854, z: 0.73075 },
      { x: 74.824058, y: -13.778429, z: 3.811224 },
      { x: 75.512796, y: -11.781894, z: 6.842108 },
      { x: 76.137893, y: -9.686682, z: 9.819709 },
      { x: 76.698588, y: -7.495345, z: 12.740399 },
      { x: 77.194197, y: -5.210552, z: 15.600619 },
      { x: 77.624117, y: -2.835088, z: 18.396886 },
      { x: 77.987824, y: -0.371847, z: 21.125792 },
      { x: 78.284876, y: 2.17617, z: 23.784013 },
      { x: 78.514909, y: 4.805859, z: 26.368309 },
      { x: 78.677644, y: 7.514017, z: 28.875532 },
      { x: 78.772882, y: 10.297342, z: 31.302628 },
      { x: 78.800508, y: 13.152445, z: 33.64664 },
      { x: 78.760488, y: 16.075848, z: 35.904711 },
      { x: 78.652871, y: 19.063987, z: 38.074091 },
      { x: 78.477787, y: 22.113223, z: 40.152137 },
      { x: 78.23545, y: 25.219841, z: 42.136316 },
      { x: 77.926155, y: 28.380055, z: 44.024212 },
      { x: 77.550279, y: 31.590016, z: 45.813524 },
      { x: 77.108281, y: 34.845812, z: 47.502072 },
      { x: 76.600698, y: 38.143477, z: 49.087799 },
      { x: 76.028149, y: 41.478994, z: 50.568773 },
      { x: 75.391331, y: 44.848298, z: 51.94319 },
      { x: 74.691021, y: 48.247284, z: 53.209375 }
    ]

    let p1 = new THREE.Vector3(points[0].x, points[0].y, points[0].z)
    let p2 = new THREE.Vector3(points[1].x, points[1].y, points[1].z)
    let p3 = new THREE.Vector3(points[2].x, points[2].y, points[2].z)
    let p0 = new THREE.Vector3(points[3].x, points[3].y, points[3].z)
    this.addTriangleToScene(p1, p2, p3)
    this.addPointToCloud(p1.x, p1.y, p1.z, 0x00ffff)
    this.addPointToCloud(p2.x, p2.y, p2.z, 0x00ffff)
    this.addPointToCloud(p3.x, p3.y, p3.z, 0x00ffff)
    this.addPointToCloud(p0.x, p0.y, p0.z, 0xff7711)

    points.splice(0, 4)
    points.forEach(point => {
      this.addPointToCloud(point.x, point.y, point.z)
    })

    this.estimate3DCircle3Points(p1, p2, p3)
  }
}

export default Viewer
