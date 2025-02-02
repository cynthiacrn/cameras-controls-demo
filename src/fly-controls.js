import * as THREE from 'three'
import { FlyControls } from 'three/addons/controls/FlyControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl-fly-controls')

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
scene.background = new THREE.Color('#222222')

// Objects
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 })

for (let i = 0; i < 100; i++) {
  const cube = new THREE.Mesh(geometry, material)
  cube.position.set(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  )
  scene.add(cube)
}

// Lights
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(5, 10, 5)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0x666666)
scene.add(ambientLight)

// Camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 500)
camera.position.set(0, 5, 10)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

// Controls
const controls = new FlyControls(camera, canvas)
controls.movementSpeed = 20
controls.rollSpeed = Math.PI / 6
controls.autoForward = false
controls.dragToLook = true

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
