import * as THREE from 'three'
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl-first-person-controls')

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
scene.background = new THREE.Color('black')
scene.fog = new THREE.FogExp2('#ffd6ff', 0.002)

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#FFADFF' })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 1, -5)
mesh.receiveShadow = true
mesh.castShadow = true
scene.add(mesh)

const planeGeometry = new THREE.PlaneGeometry(10, 10)
const planeMaterial = new THREE.MeshPhongMaterial({ color: "white", wireframe: false })
const plane = new THREE.Mesh(planeGeometry, planeMaterial)

plane.rotation.x -= Math.PI / 2
plane.scale.x = 3
plane.scale.y = 3
plane.receiveShadow = true
scene.add(plane)

// Lights
const light1 = new THREE.PointLight("white", 0.8)
light1.position.set(0, 3, 0)
light1.castShadow = true
scene.add(light1)

let light2 = new THREE.AmbientLight("#ffd6ff", 0.15)
light2.position.set(10, 2, 0)
scene.add(light2)

// Camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0.5, 5)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls (First Person)
const controls = new FirstPersonControls(camera, canvas)
controls.lookSpeed = 0
controls.movementSpeed = 2
controls.noFly = true
controls.autoForward = false
controls.lookVertical = true
controls.dragToLook = false

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const delta = clock.getDelta()

  // Update controls
  controls.update(delta)

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
