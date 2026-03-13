import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import data from '../data/processed_data.json';

// --- SCENE SETUP ---
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05050a, 0.02); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ 
    antialias: false, 
    alpha: true,
    powerPreference: "high-performance" 
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

// --- SYNAPTIC DUST ---
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 600; 
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 120; 
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15, color: 0x4444ff, transparent: true,
    opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false
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
        case 'Commanding/Robotic': return 0xb088ff; 
        case 'Conversational': return 0x00ffcc;     
        case 'Frustrated/Aggressive': return 0xff4444; 
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
let synapticCurve;
const synapticPulses = []; 

// --- DATA FETCHING & INSTANTIATION ---
function initNeuralNetwork() {
    const points = [];

    data.forEach((interaction, index) => {
        const colorHex = getColorHex(interaction.tone);
        const geometry = getGeometry(interaction.catalyst);
        
        const material = new THREE.MeshBasicMaterial({ 
            color: colorHex, wireframe: true, transparent: true, opacity: 1.0 
        });
        const mesh = new THREE.Mesh(geometry, material);

        const glowMaterial = new THREE.MeshBasicMaterial({
            color: colorHex, transparent: true, opacity: 0.4,
            blending: THREE.AdditiveBlending, depthWrite: false
        });
        const glowMesh = new THREE.Mesh(geometry, glowMaterial);
        glowMesh.scale.set(1.4, 1.4, 1.4); 
        mesh.add(glowMesh); 

        // Sparks
        if (interaction.friction >= 4) {
            const sparkCount = 40;
            const sparkGeo = new THREE.BufferGeometry();
            const sparkPos = new Float32Array(sparkCount * 3);
            for(let i=0; i<sparkCount*3; i++) sparkPos[i] = (Math.random()-0.5)*2.5;
            sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
            
            const sparkMat = new THREE.PointsMaterial({
                color: 0xff3333, size: 0.15, blending: THREE.AdditiveBlending, transparent: true
            });
            const sparks = new THREE.Points(sparkGeo, sparkMat);
            mesh.add(sparks);
            mesh.userData.sparks = sparks; 
        }

        const posX = (index - (data.length / 2)) * 4; 
        const posY = getYPosition(interaction.timeOfDay);
        const posZ = (Math.random() - 0.5) * 15; 
        
        mesh.position.set(posX, posY, posZ);
        points.push(new THREE.Vector3(posX, posY, posZ));

        const nodeScale = getScale(interaction.depth);
        mesh.scale.set(nodeScale, nodeScale, nodeScale);

        // FEATURE 4: Store baseScale for organic "Breathing" animation
        mesh.userData = { 
            friction: interaction.friction,
            baseX: posX, baseY: posY, baseZ: posZ,
            baseScale: nodeScale,
            randomOffset: Math.random() * Math.PI * 2,
            rawInteraction: interaction 
        };

        scene.add(mesh);
        neuralNodes.push(mesh);
    });

    if (points.length > 1) {
        synapticCurve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(synapticCurve, points.length * 10, 0.15, 8, false);
        
        // FEATURE 5: Data-Driven Gradient Tube Math
        // We interpolate colors across the tube vertices based on the data points it connects.
        const vertexCount = tubeGeometry.attributes.position.count;
        const colors = new Float32Array(vertexCount * 3);
        const uvs = tubeGeometry.attributes.uv; // uv.x represents progress along the tube (0 to 1)

        for (let i = 0; i < vertexCount; i++) {
            const u = uvs.getX(i);
            const segmentFloat = u * (data.length - 1); // Which data segment are we in?
            const index1 = Math.floor(segmentFloat);
            const index2 = Math.min(index1 + 1, data.length - 1);
            const interpolation = segmentFloat - index1;

            const color1 = new THREE.Color(getColorHex(data[index1].tone));
            const color2 = new THREE.Color(getColorHex(data[index2].tone));
            
            // Lerp (blend) between the two colors based on exactly where the vertex is
            const finalColor = color1.clone().lerp(color2, interpolation);

            colors[i * 3] = finalColor.r;
            colors[i * 3 + 1] = finalColor.g;
            colors[i * 3 + 2] = finalColor.b;
        }
        tubeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Use vertexColors: true to activate the gradient
        const tubeMaterial = new THREE.MeshBasicMaterial({ 
            vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending 
        });
        const thoughtTrail = new THREE.Mesh(tubeGeometry, tubeMaterial);
        scene.add(thoughtTrail);

        // Synaptic Pulses
        for(let i = 0; i < 6; i++) {
            const pulseMesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 8, 8), 
                new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
            );
            scene.add(pulseMesh);
            synapticPulses.push({ mesh: pulseMesh, t: i * (1/6) }); 
        }
    }
}

initNeuralNetwork();

// --- TIMELINE SCRUBBER & CAMERA FOCUS ---
const timelineContainer = document.getElementById('timeline-container');
let isFocusing = false;
let focusProgress = 0;
let focusStartCameraPos = new THREE.Vector3();
let focusStartLookAt = new THREE.Vector3();
let targetCameraPos = new THREE.Vector3();
let targetLookAt = new THREE.Vector3();

data.forEach((item, index) => {
    const tick = document.createElement('div');
    tick.className = 'timeline-tick';
    
    // FEATURE 2: Timeline "Memory Previews" Injection
    const tooltipContent = item.timestamp ? item.timestamp : `Interaction ${index + 1}`;
    tick.innerHTML = `<div class="tick-tooltip">${tooltipContent}</div>`;
    
    tick.addEventListener('click', () => {
        document.querySelectorAll('.timeline-tick').forEach(t => t.classList.remove('active'));
        tick.classList.add('active');

        const node = neuralNodes[index];
        focusStartCameraPos.copy(camera.position);
        focusStartLookAt.copy(controls.target);
        
        targetCameraPos.copy(node.position).add(new THREE.Vector3(0, 0, 12)); 
        targetLookAt.copy(node.position);
        
        focusProgress = 0;
        isFocusing = true;
        isIntroPlaying = false; 
        controls.enabled = false; 
    });
    
    timelineContainer.appendChild(tick);
});

// --- CINEMATIC INTRO SETUP ---
let isIntroPlaying = true;
let introProgress = 0;
const introDuration = 6.5; 

const introStartPos = new THREE.Vector3().copy(neuralNodes[0].position).add(new THREE.Vector3(0, 0, 4));
const introEndPos = new THREE.Vector3(0, 0, 40);

camera.position.copy(introStartPos);
controls.target.copy(neuralNodes[0].position);
controls.enabled = false;

// --- RAYCASTER (HOVER INTERACTION) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');
let hoveredNode = null;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    tooltip.style.left = (event.clientX + 15) + 'px';
    tooltip.style.top = (event.clientY + 15) + 'px';
});

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.02;

    if (isIntroPlaying) {
        introProgress += delta / introDuration;
        if (introProgress >= 1) {
            introProgress = 1;
            isIntroPlaying = false;
            controls.enabled = true; 
        }
        const ease = 1 - Math.pow(1 - introProgress, 4);
        camera.position.lerpVectors(introStartPos, introEndPos, ease);
        controls.target.lerpVectors(neuralNodes[0].position, new THREE.Vector3(0, 0, 0), ease);
    }

    if (isFocusing) {
        focusProgress += delta * 1.5; 
        if (focusProgress >= 1) {
            focusProgress = 1;
            isFocusing = false;
            controls.enabled = true; 
        }
        const ease = 1 - Math.pow(1 - focusProgress, 3);
        camera.position.lerpVectors(focusStartCameraPos, targetCameraPos, ease);
        controls.target.lerpVectors(focusStartLookAt, targetLookAt, ease);
    }

    if (synapticCurve) {
        synapticPulses.forEach(pulse => {
            pulse.t += delta * 0.05; 
            if (pulse.t > 1) pulse.t = 0; 
            const pos = synapticCurve.getPointAt(pulse.t);
            pulse.mesh.position.copy(pos);
        });
    }

    // Node Animations
    neuralNodes.forEach(node => {
        const friction = node.userData.friction; 
        
        node.rotation.x = elapsedTime * 0.2 * (friction * 0.5);
        node.rotation.y = elapsedTime * 0.3 * (friction * 0.5);

        // FEATURE 4: Organic Breathing Node Math
        // A slow sine wave combined with the node's random offset to make them pulsate organically
        const organicBreath = Math.sin(elapsedTime * 2 + node.userData.randomOffset) * 0.08;
        const currentScale = node.userData.baseScale + organicBreath;
        node.scale.set(currentScale, currentScale, currentScale);

        if (friction > 1) {
            const vibrationSpeed = elapsedTime * (friction * 0.8); 
            const displacement = friction * 0.05; 
            node.position.x = node.userData.baseX + Math.sin(vibrationSpeed + node.userData.randomOffset) * displacement;
            node.position.y = node.userData.baseY + Math.cos(vibrationSpeed + node.userData.randomOffset) * displacement;
        }

        if (node.userData.sparks) {
            const posAttr = node.userData.sparks.geometry.attributes.position;
            for(let i = 0; i < posAttr.count; i++) {
                let x = posAttr.getX(i);
                let y = posAttr.getY(i);
                let z = posAttr.getZ(i);
                x += (Math.random() - 0.5) * 0.3;
                y += (Math.random() - 0.5) * 0.3;
                z += (Math.random() - 0.5) * 0.3;
                if (Math.abs(x) > 2) x *= 0.8;
                if (Math.abs(y) > 2) y *= 0.8;
                if (Math.abs(z) > 2) z *= 0.8;
                posAttr.setXYZ(i, x, y, z);
            }
            posAttr.needsUpdate = true;
        }
    });

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(neuralNodes, false);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (hoveredNode !== object) {
            hoveredNode = object;
            document.body.style.cursor = 'pointer';
            
            const data = object.userData.rawInteraction;
            const hexString = '#' + getColorHex(data.tone).toString(16).padStart(6, '0');

            tooltip.innerHTML = `
                <div style="margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 8px; color: #fff; font-size: 14px; letter-spacing: 0.5px;">
                    ${data.timestamp}
                </div>
                <strong>Catalyst</strong><span class="tooltip-value" style="color:#fff">${data.catalyst}</span>
                <strong>Tone</strong><span class="tooltip-value" style="color: ${hexString}; font-weight: bold; text-shadow: 0 0 8px ${hexString}88;">${data.tone}</span>
                <strong>Friction</strong><span class="tooltip-value" style="color:#fff">${data.friction} / 5</span>
                <strong>Depth</strong><span class="tooltip-value" style="color:#fff">${data.depth}</span>
                <strong>Time</strong><span class="tooltip-value" style="color:#fff">${data.timeOfDay}</span>
            `;
            tooltip.style.opacity = 1;
        }
    } else {
        if (hoveredNode) {
            hoveredNode = null;
            document.body.style.cursor = 'default';
            tooltip.style.opacity = 0; 
        }
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});