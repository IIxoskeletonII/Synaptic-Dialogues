import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import data from '../data/processed_data.json';

// --- SCENE SETUP ---
const scene = new THREE.Scene();
// FIX 1: Dramatically reduced fog density to reveal deep background elements
scene.fog = new THREE.FogExp2(0x05050a, 0.005); 

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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// ==========================================
// --- THE LIVING VOID (BACKGROUND) ---
// ==========================================
const backgroundEnvironment = new THREE.Group();
scene.add(backgroundEnvironment);

// 1. STANDARD DUST (Boosted size and opacity)
const bgParticlesGeo = new THREE.BufferGeometry();
const bgParticlesCount = 800; 
const posArray = new Float32Array(bgParticlesCount * 3);
for(let i = 0; i < bgParticlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 200; 
}
bgParticlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const bgParticlesMat = new THREE.PointsMaterial({
    size: 0.25, color: 0x6666ff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false
});
const bgParticlesMesh = new THREE.Points(bgParticlesGeo, bgParticlesMat);
backgroundEnvironment.add(bgParticlesMesh);

// 2. FEATURE 5: GHOST PARAMETERS (Brighter, closer)
const ghostGroup = new THREE.Group();
const ghostGeometries = [
    new THREE.IcosahedronGeometry(1.5),
    new THREE.OctahedronGeometry(1.5),
    new THREE.TetrahedronGeometry(1.5)
];
const ghostMat = new THREE.MeshBasicMaterial({ 
    color: 0x555577, wireframe: true, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending 
});
for(let i = 0; i < 80; i++) {
    const geo = ghostGeometries[Math.floor(Math.random() * ghostGeometries.length)];
    const ghost = new THREE.Mesh(geo, ghostMat);
    ghost.position.set((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 150, (Math.random() - 0.5) * 80 - 40);
    ghost.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    ghost.userData = { rotSpeedX: (Math.random()-0.5)*0.01, rotSpeedY: (Math.random()-0.5)*0.01 };
    ghostGroup.add(ghost);
}
backgroundEnvironment.add(ghostGroup);

// 3. FEATURE 1: LATENT SPACE PLEXUS (Brighter, closer)
const plexusNodesCount = 100;
const plexusData = [];
for(let i=0; i < plexusNodesCount; i++) {
    plexusData.push({
        base: new THREE.Vector3((Math.random()-0.5)*150, (Math.random()-0.5)*100, (Math.random()-0.5)*80 - 20),
        phaseX: Math.random() * Math.PI * 2, phaseY: Math.random() * Math.PI * 2, phaseZ: Math.random() * Math.PI * 2,
        currentPos: new THREE.Vector3()
    });
}
const maxConnections = (plexusNodesCount * (plexusNodesCount - 1)) / 2;
const plexusLinesGeo = new THREE.BufferGeometry();
const plexusPositions = new Float32Array(maxConnections * 6);
plexusLinesGeo.setAttribute('position', new THREE.BufferAttribute(plexusPositions, 3));
const plexusMat = new THREE.LineBasicMaterial({
    color: 0xaaccff, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false
});
const plexusMesh = new THREE.LineSegments(plexusLinesGeo, plexusMat);
backgroundEnvironment.add(plexusMesh);

// 4. FEATURE 2: DATA-DRIVEN AMBIENT AURORA (Closer radius, higher opacity)
const auroraGeo = new THREE.SphereGeometry(150, 32, 32);
const auroraMat = new THREE.MeshBasicMaterial({
    color: 0x05050a, transparent: true, opacity: 0.2, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false
});
const auroraMesh = new THREE.Mesh(auroraGeo, auroraMat);
backgroundEnvironment.add(auroraMesh);
// ==========================================

// --- VISUAL ENCODING DICTIONARIES ---
const getColorHex = (tone) => {
    switch(tone) {
        case 'Commanding/Robotic': return 0xb088ff; 
        case 'Conversational': return 0x00ffcc;     
        case 'Frustrated/Aggressive': return 0xff5555; 
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

// --- PROCEDURAL PARTICLE CONSTELLATIONS ---
function createCatalystParticles(catalyst, colorHex) {
    const particleCount = catalyst === 'Blank Page Syndrome' ? 100 : 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        let x, y, z;
        if (catalyst === 'Efficiency/Laziness') {
            const r = Math.random() * 0.6;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
        } else if (catalyst === 'Curiosity/Rabbit Hole') {
            const angle = Math.random() * Math.PI * 4;
            const radius = (angle / (Math.PI * 4)) * 1.5;
            x = Math.cos(angle) * radius + (Math.random()-0.5)*0.3;
            y = (Math.random() - 0.5) * 0.4;
            z = Math.sin(angle) * radius + (Math.random()-0.5)*0.3;
        } else if (catalyst === 'Urgency/Deadline') {
            const r = Math.random() > 0.8 ? 1.8 : 0.7; 
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
        } else if (catalyst === 'Debugging/Stuck') {
            x = (Math.random() - 0.5) * 2.5;
            y = (Math.random() - 0.5) * 2.5;
            z = (Math.random() - 0.5) * 2.5;
        } else {
            x = (Math.random() - 0.5) * 3.5;
            y = (Math.random() - 0.5) * 3.5;
            z = (Math.random() - 0.5) * 3.5;
        }
        positions[i*3] = x;
        positions[i*3+1] = y;
        positions[i*3+2] = z;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: colorHex, size: 0.14, transparent: true,
        opacity: 1.0, blending: THREE.AdditiveBlending, depthWrite: false
    });
    
    return new THREE.Points(geometry, material);
}

const nodeGroups = [];
const hitboxes = []; 
let synapticCurve;
const synapticPulses = []; 

// --- DYNAMIC CINEMATIC TRAVERSAL SETUP ---
let isIntroPlaying = true;
let introProgress = 0;
const introDuration = 18.0; 
controls.enabled = false;

const currentCamPos = new THREE.Vector3();
const currentLookTarget = new THREE.Vector3();
const idealCamPos = new THREE.Vector3();
const idealLookTarget = new THREE.Vector3();

// --- DATA FETCHING & INSTANTIATION ---
function initNeuralNetwork() {
    const points = [];

    data.forEach((interaction, index) => {
        const group = new THREE.Group();
        const colorHex = getColorHex(interaction.tone);
        
        const particles = createCatalystParticles(interaction.catalyst, colorHex);
        group.add(particles);

        const glowMaterial = new THREE.MeshBasicMaterial({
            color: colorHex, transparent: true, opacity: 0.3,
            blending: THREE.AdditiveBlending, depthWrite: false
        });
        const glowSphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), glowMaterial);
        group.add(glowSphere);

        if (interaction.friction >= 4) {
            const sparkCount = 40;
            const sparkGeo = new THREE.BufferGeometry();
            const sparkPos = new Float32Array(sparkCount * 3);
            for(let i=0; i<sparkCount*3; i++) sparkPos[i] = (Math.random()-0.5)*2.5;
            sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
            
            const sparkMat = new THREE.PointsMaterial({
                color: 0xff5555, size: 0.15, blending: THREE.AdditiveBlending, transparent: true
            });
            const sparks = new THREE.Points(sparkGeo, sparkMat);
            group.add(sparks);
            group.userData.sparks = sparks; 
        }

        const hitboxGeo = new THREE.SphereGeometry(1.5, 8, 8);
        const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitbox = new THREE.Mesh(hitboxGeo, hitboxMat);
        hitbox.userData = { rawInteraction: interaction };
        group.add(hitbox);
        hitboxes.push(hitbox);

        const posX = (index - (data.length / 2)) * 4; 
        const posY = getYPosition(interaction.timeOfDay);
        const posZ = (Math.random() - 0.5) * 15; 
        
        group.position.set(posX, posY, posZ);
        points.push(new THREE.Vector3(posX, posY, posZ));

        const nodeScale = getScale(interaction.depth);
        group.scale.set(nodeScale, nodeScale, nodeScale);

        group.userData = { 
            catalyst: interaction.catalyst,
            friction: interaction.friction,
            baseX: posX, baseY: posY, baseZ: posZ,
            baseScale: nodeScale,
            randomOffset: Math.random() * Math.PI * 2
        };

        scene.add(group);
        nodeGroups.push(group);
    });

    if (points.length > 1) {
        synapticCurve = new THREE.CatmullRomCurve3(points);
        const tubeGeometry = new THREE.TubeGeometry(synapticCurve, points.length * 10, 0.15, 8, false);
        
        const vertexCount = tubeGeometry.attributes.position.count;
        const colors = new Float32Array(vertexCount * 3);
        const uvs = tubeGeometry.attributes.uv; 

        for (let i = 0; i < vertexCount; i++) {
            const u = uvs.getX(i);
            const segmentFloat = u * (data.length - 1); 
            const index1 = Math.floor(segmentFloat);
            const index2 = Math.min(index1 + 1, data.length - 1);
            const interpolation = segmentFloat - index1;

            const color1 = new THREE.Color(getColorHex(data[index1].tone));
            const color2 = new THREE.Color(getColorHex(data[index2].tone));
            
            const finalColor = color1.clone().lerp(color2, interpolation);

            colors[i * 3] = finalColor.r;
            colors[i * 3 + 1] = finalColor.g;
            colors[i * 3 + 2] = finalColor.b;
        }
        tubeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const tubeMaterial = new THREE.MeshBasicMaterial({ 
            vertexColors: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending 
        });
        const thoughtTrail = new THREE.Mesh(tubeGeometry, tubeMaterial);
        scene.add(thoughtTrail);

        for(let i = 0; i < 6; i++) {
            const pulseMesh = new THREE.Mesh(
                new THREE.SphereGeometry(0.3, 8, 8), 
                new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
            );
            scene.add(pulseMesh);
            synapticPulses.push({ mesh: pulseMesh, t: i * (1/6) }); 
        }

        currentCamPos.copy(synapticCurve.getPointAt(0)).add(new THREE.Vector3(0, 5, 16));
        currentLookTarget.copy(synapticCurve.getPointAt(0.01));
        camera.position.copy(currentCamPos);
        controls.target.copy(currentLookTarget);
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
    
    const tooltipContent = item.timestamp ? item.timestamp : `Interaction ${index + 1}`;
    tick.innerHTML = `<div class="tick-tooltip">${tooltipContent}</div>`;
    
    tick.addEventListener('click', () => {
        document.querySelectorAll('.timeline-tick').forEach(t => t.classList.remove('active'));
        tick.classList.add('active');

        const group = nodeGroups[index];
        focusStartCameraPos.copy(camera.position);
        focusStartLookAt.copy(controls.target);
        
        targetCameraPos.copy(group.position).add(new THREE.Vector3(0, 0, 12)); 
        targetLookAt.copy(group.position);
        
        focusProgress = 0;
        isFocusing = true;
        isIntroPlaying = false; 
        controls.enabled = false; 
    });
    
    timelineContainer.appendChild(tick);
});

// --- RAYCASTER (HOVER & CLICK INTERACTION) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const rawMouse = new THREE.Vector2(0, 0);
const tooltip = document.getElementById('tooltip');
let hoveredNode = null;

window.addEventListener('mousemove', (event) => {
    rawMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    rawMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mouse.copy(rawMouse);
    
    tooltip.style.left = (event.clientX + 15) + 'px';
    tooltip.style.top = (event.clientY + 15) + 'px';
});

window.addEventListener('click', () => {
    if (hoveredNode) {
        const group = hoveredNode.parent;
        const index = nodeGroups.indexOf(group);

        if (index !== -1) {
            document.querySelectorAll('.timeline-tick').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.timeline-tick')[index].classList.add('active');
        }

        focusStartCameraPos.copy(camera.position);
        focusStartLookAt.copy(controls.target);
        
        targetCameraPos.copy(group.position).add(new THREE.Vector3(0, 0, 12)); 
        targetLookAt.copy(group.position);
        
        focusProgress = 0;
        isFocusing = true;
        isIntroPlaying = false; 
        controls.enabled = false;
    }
});

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();
const targetAuroraColor = new THREE.Color(0x05050a);

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // FEATURE 4: Interactive Deep Parallax
    const parallaxX = rawMouse.x * 15;
    const parallaxY = rawMouse.y * 15;
    backgroundEnvironment.position.x += (parallaxX - backgroundEnvironment.position.x) * 0.05;
    backgroundEnvironment.position.y += (parallaxY - backgroundEnvironment.position.y) * 0.05;

    // Feature 5 Animation: Tumbling Ghosts
    ghostGroup.children.forEach(ghost => {
        ghost.rotation.x += ghost.userData.rotSpeedX;
        ghost.rotation.y += ghost.userData.rotSpeedY;
    });

    // Feature 1 Animation: Latent Space Plexus Calculation
    let vertexIndex = 0;
    plexusData.forEach((node) => {
        node.currentPos.x = node.base.x + Math.sin(elapsedTime * 0.5 + node.phaseX) * 5;
        node.currentPos.y = node.base.y + Math.cos(elapsedTime * 0.4 + node.phaseY) * 5;
        node.currentPos.z = node.base.z + Math.sin(elapsedTime * 0.6 + node.phaseZ) * 5;
    });
    
    // FIX: Increased threshold distance to guarantee connections are visible
    for(let i=0; i < plexusNodesCount; i++) {
        for(let j=i+1; j < plexusNodesCount; j++) {
            const dist = plexusData[i].currentPos.distanceTo(plexusData[j].currentPos);
            if(dist < 25) { 
                plexusPositions[vertexIndex++] = plexusData[i].currentPos.x;
                plexusPositions[vertexIndex++] = plexusData[i].currentPos.y;
                plexusPositions[vertexIndex++] = plexusData[i].currentPos.z;
                
                plexusPositions[vertexIndex++] = plexusData[j].currentPos.x;
                plexusPositions[vertexIndex++] = plexusData[j].currentPos.y;
                plexusPositions[vertexIndex++] = plexusData[j].currentPos.z;
            }
        }
    }
    plexusLinesGeo.setDrawRange(0, vertexIndex / 3);
    plexusLinesGeo.attributes.position.needsUpdate = true;

    bgParticlesMesh.rotation.y = elapsedTime * 0.02;

    // --- CINEMATIC TRAVERSAL & AURORA TINTING ---
    if (isIntroPlaying && synapticCurve) {
        introProgress += delta / introDuration;
        
        if (introProgress >= 1) {
            introProgress = 1;
            isIntroPlaying = false;
            controls.enabled = true; 
        }

        const t = introProgress; 
        const pathPoint = synapticCurve.getPointAt(t);
        const lookAheadT = Math.min(t + 0.05, 1.0); 
        const pathAheadPoint = synapticCurve.getPointAt(lookAheadT);
        const pullOutFactor = Math.pow(introProgress, 10);
        const dronePos = pathPoint.clone().add(new THREE.Vector3(0, 5, 16));
        const overviewPos = new THREE.Vector3(0, 48, 0);

        idealCamPos.lerpVectors(dronePos, overviewPos, pullOutFactor);
        idealLookTarget.lerpVectors(pathAheadPoint, new THREE.Vector3(0, 0, 0), pullOutFactor);

        const smoothing = 1 - Math.exp(-6 * delta);
        currentCamPos.lerp(idealCamPos, smoothing);
        currentLookTarget.lerp(idealLookTarget, smoothing * 1.5);

        camera.position.copy(currentCamPos);
        controls.target.copy(currentLookTarget);

        const index1 = Math.floor(t * (data.length - 1));
        const index2 = Math.min(index1 + 1, data.length - 1);
        const interpolation = (t * (data.length - 1)) - index1;
        const c1 = new THREE.Color(getColorHex(data[index1].tone));
        const c2 = new THREE.Color(getColorHex(data[index2].tone));
        targetAuroraColor.copy(c1).lerp(c2, interpolation);
    } 
    else if (!hoveredNode) {
        // FIX: Deep Indigo resting color so the Aurora remains visible in the background
        targetAuroraColor.setHex(0x111122); 
    }

    auroraMat.color.lerp(targetAuroraColor, 0.03);

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

    nodeGroups.forEach(group => {
        const friction = group.userData.friction; 
        const catalyst = group.userData.catalyst;
        
        const organicBreath = Math.sin(elapsedTime * 2 + group.userData.randomOffset) * 0.08;
        const currentScale = group.userData.baseScale + organicBreath;
        group.scale.set(currentScale, currentScale, currentScale);

        group.rotation.y += delta * 0.5;

        if (catalyst === 'Curiosity/Rabbit Hole') {
            group.rotation.y += delta * 1.5; 
        } else if (catalyst === 'Urgency/Deadline') {
            group.position.x += (Math.random() - 0.5) * 0.08;
            group.position.y += (Math.random() - 0.5) * 0.08;
            group.position.lerp(new THREE.Vector3(group.userData.baseX, group.userData.baseY, group.userData.baseZ), 0.15);
        }

        if (friction > 1 && catalyst !== 'Urgency/Deadline') {
            const vibrationSpeed = elapsedTime * (friction * 0.8); 
            const displacement = friction * 0.05; 
            group.position.x = group.userData.baseX + Math.sin(vibrationSpeed + group.userData.randomOffset) * displacement;
            group.position.y = group.userData.baseY + Math.cos(vibrationSpeed + group.userData.randomOffset) * displacement;
        }

        if (group.userData.sparks) {
            const posAttr = group.userData.sparks.geometry.attributes.position;
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
    const intersects = raycaster.intersectObjects(hitboxes, false);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (hoveredNode !== object) {
            hoveredNode = object;
            document.body.style.cursor = 'pointer';
            
            const data = object.userData.rawInteraction;
            const hexString = '#' + getColorHex(data.tone).toString(16).padStart(6, '0');

            targetAuroraColor.setHex(getColorHex(data.tone));

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