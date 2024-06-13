// Import three js
import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();
// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Create renderer
const renderer = new THREE.WebGLRenderer();
// Set size of renderer to window size
renderer.setSize(window.innerWidth, window.innerHeight);
// Enable shadows for scene
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// Add renderer into html doc
document.body.appendChild(renderer.domElement);

// Create wall and add it to scene
const wallGeometry = new THREE.PlaneGeometry(10, 10);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, side: THREE.DoubleSide });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.receiveShadow = true;
wall.position.z = -5;
scene.add(wall);

// Create point light
const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
// Set position of light
pointLight.position.set(0, 5, 5);
// Enable shadows
pointLight.castShadow = true;
// Set size of shadow map
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 500;
// Add shadow to scene
scene.add(pointLight);

// Create and add to scene ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Create light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// Set position of light
directionalLight.position.set(0, 4, 5);
directionalLight.target.position.set(0, 0, -5);
// Enable shadows
directionalLight.castShadow = true;
// Set map size of shadow
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
// Add lights to scene
scene.add(directionalLight);
scene.add(directionalLight.target);

// Create ring of spheres
function createRingOfSpheres(N) {
    // Set radius of sphere
    const radius = 3;
    // Create sphere and its material
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x0000FF,
        roughness: 0.2,
        metalness: 0.8
    });

    // Create all spheres and move them into ring
    for (let i = 0; i < N; i++) {
        const angle = (i / N) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(x, y, 0);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        scene.add(sphere);
    }
}

// Create 20 spheres
createRingOfSpheres(20);

// Set camera position
camera.position.set(0, 0, 10);

// Three js animate function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();


