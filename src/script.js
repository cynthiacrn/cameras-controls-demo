import * as THREE from 'three'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update cameras
  perspectiveCamera.aspect = sizes.width / sizes.height
  perspectiveCamera.updateProjectionMatrix()

  orthographicCamera.left = - 400 * sizes.width / sizes.height / 2
  orthographicCamera.right = 400 * sizes.width / sizes.height / 2
  orthographicCamera.top = 400 / 2
  orthographicCamera.bottom = - 400 / 2
  orthographicCamera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // Update controls
  controls.handleResize()
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    }
    else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }

  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#ffd6ff')
scene.fog = new THREE.FogExp2('#ffd6ff', 0.002)

// Objects
const geometry = new THREE.CylinderGeometry(8, 8, 24, 16)
const material = new THREE.MeshPhongMaterial({ color: '#FFADFF', flatShading: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

for (let i = 0; i < 500; i ++) {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.x = (Math.random() - 0.5) * 1000
  mesh.position.y = (Math.random() - 0.5) * 1000
  mesh.position.z = (Math.random() - 0.5) * 1000
  mesh.updateMatrix()
  mesh.matrixAutoUpdate = false
  scene.add(mesh)
}

// Lights
const dirLight1 = new THREE.DirectionalLight(0xffffff, 3)
dirLight1.position.set(1, 1, 1)
scene.add(dirLight1)

const dirLight2 = new THREE.DirectionalLight('#520052', 3)
dirLight2.position.set(- 1, - 1, - 1)
scene.add(dirLight2)

const ambientLight = new THREE.AmbientLight('#555555')
scene.add(ambientLight)

// Cameras
const perspectiveCamera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 1000)
perspectiveCamera.position.z = 500

const orthographicCamera = new THREE.OrthographicCamera(
  400 * sizes.width / sizes.height / -2,
  400 * sizes.width / sizes.height / 2,
  400 / 2,
  400 / -2,
  1,
  1000
)
orthographicCamera.position.z = 500

let activeCamera = perspectiveCamera
scene.add(activeCamera)

// Controls
let controls = new TrackballControls(activeCamera, canvas)
controls.rotateSpeed = 1.0
controls.zoomSpeed = 1.2
controls.panSpeed = 0.8

// GUI
const params = { orthographicCamera: false }
const gui = new GUI()
gui.add(params, 'orthographicCamera').name('Use Orthographic').onChange((value) => {
  scene.remove(activeCamera)
  if (value) {
    activeCamera = orthographicCamera
  } else {
    activeCamera = perspectiveCamera
  }
  scene.add(activeCamera)
  controls.dispose()
  controls = new TrackballControls(activeCamera, canvas)
})

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

const tick = () => {
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, activeCamera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
