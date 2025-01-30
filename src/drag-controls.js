import * as THREE from 'three'
import { DragControls } from 'three/addons/controls/DragControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl-drag-controls')

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
scene.background = new THREE.Color('#f0f0f0')

// Objects
const objects = []
const group = new THREE.Group()
scene.add(group)

const geometry = new THREE.ConeGeometry(0.4, 1, 32)

for (let i = 0; i < 200; i ++) {

  const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff }))

  object.position.x = Math.random() * 30 - 15
  object.position.y = Math.random() * 15 - 7.5
  object.position.z = Math.random() * 20 - 10

  object.rotation.x = Math.random() * 2 * Math.PI
  object.rotation.y = Math.random() * 2 * Math.PI
  object.rotation.z = Math.random() * 2 * Math.PI

  object.scale.x = Math.random() * 2 + 1
  object.scale.y = Math.random() * 2 + 1
  object.scale.z = Math.random() * 2 + 1

  object.castShadow = true
  object.receiveShadow = true

  scene.add(object)

  objects.push(object)

}

// Lights
scene.add(new THREE.AmbientLight(0xaaaaaa))
const light = new THREE.SpotLight(0xf0f0f0, 2)
light.position.set( 0, 25, 50 )
light.angle = Math.PI / 9

light.castShadow = true
light.shadow.camera.near = 10
light.shadow.camera.far = 100
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024

scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 500)
camera.position.z = 25

scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

// Controls
const controls = new DragControls( [ ... objects ], camera, renderer.domElement )
controls.rotateSpeed = 2

const tick = () => {
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
