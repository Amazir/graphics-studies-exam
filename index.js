import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const wallGeometry = new THREE.PlaneGeometry(10, 10);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00, side: THREE.DoubleSide });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.receiveShadow = true;
wall.position.z = -5;
scene.add(wall);

const pointLight = new THREE.PointLight(0xFFFFFF, 1, 100);
pointLight.position.set(0, 5, 5);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.5;
pointLight.shadow.camera.far = 500;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 4, 5);
directionalLight.target.position.set(0, 0, -5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
scene.add(directionalLight);
scene.add(directionalLight.target);

function createRingOfSpheres(N) {
    const radius = 3;
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x0000FF,
        roughness: 0.2,
        metalness: 0.8
    });

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

createRingOfSpheres(20);

camera.position.set(0, 0, 10);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();


