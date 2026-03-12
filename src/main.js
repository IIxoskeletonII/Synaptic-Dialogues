import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import data from '../data/processed_data.json';

// --- SCENE SETUP ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05050a, 0.02); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 40);

// OPTIMIZATION 1: Force High-Performance GPU and disable anti-aliasing for raw speed
const renderer = new THREE.WebGLRenderer({ 
    antialias: false, 
    alpha: true,
    powerPreference: "high-performance" // Demands the RTX 3060 if available
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// --- LIGHTING ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// --- SYNAPTIC DUST (Highly Optimized) ---
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 600; 
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 120; 
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: 0x4444ff,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// --- VISUAL ENCODING DICTIONARIES ---
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

const getColorHex = (tone) => {
    switch(tone) {
        case 'Commanding/Robotic': return 0xaaaaaa; 
        case 'Conversational': return 0x00ffcc; 
        case 'Frustrated/Aggressive': return 0xff3333; 
        case 'Overly Polite': return 0xffcc00; 
        default: return 0xffffff;
    }
};

const getYPosition = (timeOfDay) => {
    switch(timeOfDay) {
        case 'Morning': return 15;
        case 'Afternoon': return 5;
        case 'Evening': return -5;
        case 'Late Night': return -15;
        default: return 0;
    }
};

const getScale = (depth) => {
    switch(depth) {
        case 'Hit and Run (<2 mins)': return 0.8;
        case 'The Back-and-Forth (2-10 mins)': return 1.2;
        case 'Deep Dive (10-30 mins)': return 1.8;
        case 'Lost in the Sauce (>30 mins)': return 2.5;
        default: return 1;
    }
};

const neuralNodes = [];

// --- DATA FETCHING & INSTANTIATION ---
function initNeuralNetwork() {
    const points = [];

    data.forEach((interaction, index) => {
        const colorHex = getColorHex(interaction.tone);
        const geometry = getGeometry(interaction.catalyst);
        
        // Base Solid Material
        const material = new THREE.MeshStandardMaterial({ 
            color: colorHex, 
            wireframe: true,
            transparent: true,
            opacity: 0.9
        });
        
        const mesh = new THREE.Mesh(geometry, material);

        // OPTIMIZATION 2: "Fake Bloom" using Additive Blending. Costs almost 0 performance.
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: colorHex,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const glowMesh = new THREE.Mesh(geometry, glowMaterial);
        glowMesh.scale.set(1.4, 1.4, 1.4); // Make the glow slightly larger than the core node
        mesh.add(glowMesh); // Attach glow to the main mesh

        const posX = (index - (data.length / 2)) * 4; 
        const posY = getYPosition(interaction.timeOfDay);
        const posZ = (Math.random() - 0.5) * 15; 
        
        mesh.position.set(posX, posY, posZ);
        points.push(new THREE.Vector3(posX, posY, posZ));

        const nodeScale = getScale(interaction.depth);
        mesh.scale.set(nodeScale, nodeScale, nodeScale);

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

    if (points.length > 1) {
        const curve = new THREE.CatmullRomCurve3(points);
        const curvePoints = curve.getPoints(points.length * 10); 
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
        
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00ffcc, 
            transparent: true, 
            opacity: 0.15,
            blending: THREE.AdditiveBlending 
        });
        const thoughtTrail = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(thoughtTrail);
    }
}

initNeuralNetwork();

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.02;

    neuralNodes.forEach(node => {
        const friction = node.userData.friction; 
        
        node.rotation.x = elapsedTime * 0.2 * (friction * 0.5);
        node.rotation.y = elapsedTime * 0.3 * (friction * 0.5);

        if (friction > 1) {
            const vibrationSpeed = elapsedTime * (friction * 0.8); 
            const displacement = friction * 0.05; 
            
            node.position.x = node.userData.baseX + Math.sin(vibrationSpeed + node.userData.randomOffset) * displacement;
            node.position.y = node.userData.baseY + Math.cos(vibrationSpeed + node.userData.randomOffset) * displacement;
        }
    });

    controls.update();
    
    // OPTIMIZATION 3: Return to the native renderer, bypassing the heavy EffectComposer entirely
    renderer.render(scene, camera);
}

animate();

// --- RESIZE HANDLER ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});