import * as THREE from 'three'
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js'

const controls = {}
const player = {
  height: 0.5,
  turnSpeed: 0.07,
  speed: 0.07,
  jumpHeight: 0.2 ,
  gravity: 0.01,
  velocity: 0,
  playerJumps: false
}

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
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update cameras
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
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
mesh.position.y = 0.75
mesh.position.x = 0
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
light1.shadow.camera.near = 2.5
scene.add(light1)

let light2 = new THREE.AmbientLight("#ffd6ff", 0.15)
light2.position.set(10, 2, 0)
scene.add(light2)

// Camera
const camera = new THREE.PerspectiveCamera(65, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, player.height, -5)
camera.lookAt(new THREE.Vector3(0, player.height, 0))
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
document.addEventListener('keydown', ({ keyCode }) => { controls[keyCode] = true })
document.addEventListener('keyup', ({ keyCode }) => { controls[keyCode] = false })

function control() {
  if (controls[87]) {
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed
  }
  if (controls[83]) {
    camera.position.x += Math.sin(camera.rotation.y) * player.speed
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed
  }
  if (controls[65]) {
    camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed
    camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed
  }
  if (controls[68]) {
    camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed
    camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed
  }
  if (controls[37]) {
    camera.rotation.y -= player.turnSpeed
  }
  if (controls[39]) {
    camera.rotation.y += player.turnSpeed
  }
  if (controls[32]) {
    if (player.jumps) return false
    player.jumps = true
    player.velocity = -player.jumpHeight
  }
}

function ixMovementUpdate() {
  player.velocity += player.gravity
  camera.position.y -= player.velocity

  if (camera.position.y < player.height) {
    camera.position.y = player.height
    player.jumps = false
  }
}

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Render
  renderer.render(scene, camera)

  // Update objects
  mesh.rotation.y = Math.sin(elapsedTime)

  // Update controls
  control()
  ixMovementUpdate()

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
