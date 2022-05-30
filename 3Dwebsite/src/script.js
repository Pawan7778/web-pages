import './tailwind.css'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import vertexShader from './shaders/test/vertex.glsl'
import fragmentShader from './shaders/test/fragment.glsl'
import atmosphereVertexShader from './shaders/test/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/test/atmosphereFragment.glsl'
import gsap from 'gsap'
import { Float32BufferAttribute } from 'three'


/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const globeTexture = new THREE.TextureLoader().load('/textures/earth3.jpg')


/**
 * Create  a Sphere
 */
const Sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
    vertexShader : vertexShader,
    fragmentShader : fragmentShader,
    uniforms : {
        globletexture : {
            value : globeTexture
        }
    }
}))



//Atmosphere
const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50), new THREE.ShaderMaterial({
    vertexShader : atmosphereVertexShader,
    fragmentShader : atmosphereFragmentShader,
    blending : THREE.AdditiveBlending,
    side : THREE.BackSide
}))

atmosphere.scale.set(1.1,1.1,1.1)
scene.add(atmosphere)

const group = new THREE.Group()
group.add(Sphere)
scene.add(group)

/**
 * StarGeometry
 */
const StarGeometry = new THREE.BufferGeometry()
const StarMaterial = new THREE.PointsMaterial({
    color : 0xffffff,
    size : 0.1
})


const starVertices = []
for (let i = 0 ; i < 10000 ; i++)
{
    const x = (Math.random() -0.5) * 2000
    const y = (Math.random() -0.5) * 2000
    const z = -Math.random() * 2000
    starVertices.push(x,y,z)
}

StarGeometry.setAttribute('position' , new Float32BufferAttribute(starVertices ,3))

const Star = new THREE.Points(StarGeometry,StarMaterial)
scene.add(Star)


const canvasContainer = document.querySelector('#canvasContainer')
console.log(canvasContainer);

/**
 * Sizes
 */
const sizes = {
    width: canvasContainer.offsetWidth,
    height: canvasContainer.offsetHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = canvasContainer.offsetWidth
    sizes.height = canvasContainer.offsetHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Mouse Move
 */
const mouse = {
    x : undefined,
    y : undefined
}
addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 -1
    mouse.y = -(event.clientX / innerHeight) * 2 +1
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 0, 15)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enabled = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // group.rotation.y = mouse.x * 0.5
    Sphere.rotation.y += 0.001
    gsap.to(group.rotation , {
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2
    })

    //Update Material 

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()