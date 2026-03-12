import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import data from '../data/processed_data.json'; // <-- FIX: Vite module import for the JSON data

// --- SCENE SETUP ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a1a, 0.02); // Dark void for the neural network

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// --- VISUAL ENCODING DICTIONARIES ---

// 1. Node Shape = The Catalyst
const getGeometry = (catalyst) => {
    switch(catalyst) {
        case 'Blank Page Syndrome': return new THREE.BoxGeometry(1.5, 1.5, 1.5);
        case 'Efficiency/Laziness': return new THREE.SphereGeometry(1, 16, 16);
        case 'Urgency/Deadline': return new THREE.TetrahedronGeometry(1.2);
        case 'Curiosity/Rabbit Hole': return new THREE.TorusGeometry(0.8, 0.3, 16, 32);
        case 'Debugging/Stuck': return new THREE.OctahedronGeometry(1.2);
        default: return new THREE.IcosahedronGeometry(1);
    }
};

// 2. Glow Color = Conversational Tone
const getMaterial = (tone) => {
    let colorHex;
    switch(tone) {
        case 'Commanding/Robotic': colorHex = 0x888888; break; // Cold Grey
        case 'Conversational': colorHex = 0x00ffcc; break; // Cyan/Neon Blue
        case 'Frustrated/Aggressive': colorHex = 0xff3333; break; // Red
        case 'Overly Polite': colorHex = 0xffcc00; break; // Yellow
        default: colorHex = 0xffffff;
    }
    return new THREE.MeshStandardMaterial({ 
        color: colorHex, 
        emissive: colorHex, 
        emissiveIntensity: 0.6,
        wireframe: true // Maintains the high-end tech aesthetic
    });
};

// 4. Y-Axis Height = Time of Day
const getYPosition = (timeOfDay) => {
    switch(timeOfDay) {
        case 'Morning': return 15;
        case 'Afternoon': return 5;
        case 'Evening': return -5;
        case 'Late Night': return -15;
        default: return 0;
    }
};

// 5. Node Size/Scale = Rabbit Hole Depth
const getScale = (depth) => {
    switch(depth) {
        case 'Hit and Run (<2 mins)': return 0.8;
        case 'The Back-and-Forth (2-10 mins)': return 1.2;
        case 'Deep Dive (10-30 mins)': return 1.8;
        case 'Lost in the Sauce (>30 mins)': return 2.5;
        default: return 1;
    }
};

// Array to hold interactive nodes for the animation loop
const neuralNodes = [];

// --- DATA FETCHING & INSTANTIATION ---
// FIX: Removed async/await and fetch(). We now use the imported 'data' directly.
function initNeuralNetwork() {
    // Used to create sequential connections
    const points = [];

    data.forEach((interaction, index) => {
        const geometry = getGeometry(interaction.catalyst);
        const material = getMaterial(interaction.tone);
        const mesh = new THREE.Mesh(geometry, material);

        // Positioning: X based on sequence/time, Y based on Time of Day, Z staggered
        const posX = (index - (data.length / 2)) * 4; 
        const posY = getYPosition(interaction.timeOfDay);
        const posZ = (Math.random() - 0.5) * 10; 
        
        mesh.position.set(posX, posY, posZ);
        points.push(new THREE.Vector3(posX, posY, posZ));

        // Apply Scale based on Depth
        const nodeScale = getScale(interaction.depth);
        mesh.scale.set(nodeScale, nodeScale, nodeScale);

        // 3. Store Friction data for Particle Turbulence in the render loop
        mesh.userData = { 
            friction: interaction.friction,
            baseX: posX,
            baseY: posY,
            baseZ: posZ,
            randomOffset: Math.random() * Math.PI * 2
        };

        scene.add(mesh);
        neuralNodes.push(mesh);
    });

    // 5. Trails/Connections: Draw a line connecting the thoughts sequentially
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.4 });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const thoughtTrail = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(thoughtTrail);
}

// Call the synchronous function
initNeuralNetwork();

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Apply turbulence based on Friction (Variable 3)
    neuralNodes.forEach(node => {
        const friction = node.userData.friction; // Scale of 1 to 5
        
        // Base slow rotation for all nodes
        node.rotation.x += 0.005 * friction;
        node.rotation.y += 0.01 * friction;

        // Vibration algorithm: Higher friction = heavier displacement
        if (friction > 1) {
            const vibrationSpeed = elapsedTime * (friction * 2);
            node.position.x = node.userData.baseX + Math.sin(vibrationSpeed + node.userData.randomOffset) * (friction * 0.1);
            node.position.y = node.userData.baseY + Math.cos(vibrationSpeed + node.userData.randomOffset) * (friction * 0.1);
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

// --- RESIZE HANDLER ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});