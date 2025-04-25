// 3D Effects for TikTok Growth Services

// Initialize Three.js variables
let camera, scene, renderer;
let cardElements = [];
let cardObjects = [];
let isInitialized = false;
let animationFrameId = null;

// Initialize the 3D scene
function init3DEffects() {
    if (isInitialized) return;
    isInitialized = true;
    
    // Find all cards to animate
    cardElements = document.querySelectorAll('.card');
    
    // Create the scene
    scene = new THREE.Scene();
    
    // Create camera with perspective
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.zIndex = '-1';
    renderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(renderer.domElement);
    
    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Add background particles
    createParticles();
    
    // Add floating objects for each card section
    addFloatingObjects();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create background particles
function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 400; // Increased particle count
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const tiktokBlue = new THREE.Color(0x00f2ea);
    const tiktokRed = new THREE.Color(0xff0050);
    const tiktokPurple = new THREE.Color(0x8134af); // Added purple color
    
    for (let i = 0; i < particleCount; i++) {
        // Position particles randomly in 3D space with more spread
        positions[i * 3] = (Math.random() - 0.5) * 70; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 70; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 70; // z
        
        // Vary particle sizes for more depth
        sizes[i] = Math.random() * 0.3 + 0.05;
        
        // Use different colors
        let color;
        const colorChoice = i % 3;
        if (colorChoice === 0) color = tiktokBlue;
        else if (colorChoice === 1) color = tiktokRed;
        else color = tiktokPurple;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create a custom shader material for particles with glow effect
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending, // Add glow effect
        sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Second particle system with slower movement for parallax effect
    const particleGeometry2 = particleGeometry.clone();
    const positions2 = particleGeometry2.attributes.position.array;
    
    // Position second particle system slightly differently
    for (let i = 0; i < positions2.length; i += 3) {
        positions2[i] *= 1.5;     // x
        positions2[i + 1] *= 1.5; // y
        positions2[i + 2] *= 1.5; // z
    }
    
    const particleMaterial2 = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    const particles2 = new THREE.Points(particleGeometry2, particleMaterial2);
    scene.add(particles2);
    
    // Animate particles with wave effect
    particles.userData = {
        animate: function(time) {
            particles.rotation.y = time * 0.05;
            particles.rotation.x = time * 0.03;
            
            // Add subtle wave effect to particles
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(time + positions[i] * 0.1) * 0.01;
            }
            particles.geometry.attributes.position.needsUpdate = true;
        }
    };
    
    // Animate second particle system
    particles2.userData = {
        animate: function(time) {
            particles2.rotation.y = time * 0.02;
            particles2.rotation.x = time * 0.01;
        }
    };
}

// Add floating 3D objects
function addFloatingObjects() {
    // Expanded shapes collection with more variety
    const shapes = [
        new THREE.TorusGeometry(1, 0.3, 24, 48), // More detailed torus
        new THREE.OctahedronGeometry(1, 2), // More detailed octahedron
        new THREE.TorusKnotGeometry(0.8, 0.2, 128, 32), // More detailed torus knot
        new THREE.DodecahedronGeometry(0.9, 0), // New shape: dodecahedron
        new THREE.IcosahedronGeometry(0.8, 1), // New shape: icosahedron
        new THREE.SphereGeometry(0.7, 32, 32) // New shape: sphere
    ];
    
    // Enhanced TikTok themed materials with shader effects
    const materials = [
        new THREE.MeshPhongMaterial({ 
            color: 0x00f2ea, 
            flatShading: true,
            shininess: 100,
            emissive: 0x002a2a
        }), // TikTok blue with glow
        new THREE.MeshPhongMaterial({ 
            color: 0xff0050, 
            flatShading: true,
            shininess: 100,
            emissive: 0x330010
        }), // TikTok red with glow
        new THREE.MeshStandardMaterial({ 
            color: 0xffffff, 
            metalness: 0.7, 
            roughness: 0.2
        }), // White metallic
        new THREE.MeshPhongMaterial({ 
            color: 0x8134af, 
            flatShading: true,
            shininess: 80,
            emissive: 0x1a0b23
        }) // Purple with glow
    ];
    
    // Add more floating objects in different sections
    for (let i = 0; i < 12; i++) { // Increased from 6 to 12 objects
        const shape = shapes[i % shapes.length];
        const material = materials[i % materials.length];
        
        // Create mesh with detailed shading
        const object = new THREE.Mesh(shape, material);
        object.castShadow = true;
        object.receiveShadow = true;
        
        // Scale objects to different sizes
        const scale = 0.6 + Math.random() * 0.8;
        object.scale.set(scale, scale, scale);
        
        // Distribute objects in a more interesting pattern
        const angle = (i / 12) * Math.PI * 2;
        const radiusXZ = 15 + Math.random() * 5;
        const height = (Math.random() - 0.5) * 15;
        
        object.position.x = Math.sin(angle) * radiusXZ;
        object.position.y = height;
        object.position.z = Math.cos(angle) * radiusXZ - 10;
        
        // Create more complex animations
        object.userData = {
            animate: function(time) {
                // Varying rotation speeds
                object.rotation.x = time * (0.15 + i * 0.04);
                object.rotation.y = time * (0.2 + i * 0.03);
                object.rotation.z = time * 0.05 * Math.sin(i);
                
                // More complex floating motion using multiple sine waves
                object.position.y += Math.sin(time * 0.4 + i) * 0.015;
                object.position.x += Math.sin(time * 0.3 + i * 2) * 0.005;
                object.position.z += Math.cos(time * 0.3 + i) * 0.005;
                
                // Pulse scaling effect
                const pulseFactor = 1 + Math.sin(time * 0.5 + i * 0.7) * 0.05;
                object.scale.set(scale * pulseFactor, scale * pulseFactor, scale * pulseFactor);
            }
        };
        
        scene.add(object);
        cardObjects.push(object);
    }
    
    // Add a subtle light effect that moves around
    const movingLight = new THREE.PointLight(0xffffff, 1, 50);
    movingLight.position.set(0, 0, 15);
    scene.add(movingLight);
    
    // Animate the light
    movingLight.userData = {
        animate: function(time) {
            movingLight.position.x = Math.sin(time * 0.3) * 15;
            movingLight.position.y = Math.cos(time * 0.2) * 10;
            movingLight.position.z = 15 + Math.sin(time * 0.4) * 5;
            
            // Subtle color changes over time
            const r = 0.9 + Math.sin(time * 0.3) * 0.1;
            const g = 0.9 + Math.sin(time * 0.5) * 0.1;
            const b = 0.9 + Math.sin(time * 0.7) * 0.1;
            movingLight.color.setRGB(r, g, b);
        }
    };
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    const time = performance.now() * 0.001; // Convert to seconds
    
    // Apply more dynamic camera movement
    camera.position.x = Math.sin(time * 0.3) * 0.7;
    camera.position.y = Math.sin(time * 0.2) * 0.7 + Math.cos(time * 0.1) * 0.3;
    camera.position.z = 5 + Math.sin(time * 0.05) * 0.3; // Add subtle zoom effect
    camera.lookAt(0, 0, 0);
    
    // Animate all objects with custom animation functions
    scene.traverse(function(object) {
        if (object.userData && object.userData.animate) {
            object.userData.animate(time);
        }
    });
    
    // Animate cards based on scroll position and mouse movement
    animateCards(time);
    
    // Post-processing effects (subtle glow)
    const now = Date.now() * 0.001;
    if (renderer.domElement.style.filter) {
        const pulseIntensity = Math.sin(now * 0.5) * 0.5 + 0.5;
        renderer.domElement.style.filter = `brightness(1.05) contrast(1.02) saturate(${1 + pulseIntensity * 0.2})`;
    }
    
    // Render the scene
    renderer.render(scene, camera);
    
    // Continue animation loop
    animationFrameId = requestAnimationFrame(animate);
}

// Track mouse for parallax effects
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    // Normalize mouse position to -1 to 1
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
});

// Animate cards based on their position on the page and mouse movement
function animateCards(time) {
    cardElements.forEach((element, index) => {
        // Skip animation for form elements, payment information, and legal pages
        if (element.closest('#order-form') || 
            element.closest('#paymentAccordion') || 
            element.classList.contains('accordion-item') || 
            element.classList.contains('form-control') || 
            element.classList.contains('form-select') ||
            document.body.classList.contains('legal-page')) {
            // Remove any existing transforms that might interfere with usability
            element.style.transform = 'none';
            element.style.boxShadow = '';
            element.style.border = '';
            element.style.transition = '';
            return;
        }
        
        const rect = element.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        const viewportHeight = window.innerHeight;
        
        // Enhanced visibility calculation that prioritizes center-screen content
        const distanceFromCenter = Math.abs(centerY - viewportHeight / 2);
        const visibilityFalloff = viewportHeight * 0.6; // Faster falloff for more pronounced effect
        const visibility = Math.max(0, 1 - (distanceFromCenter / visibilityFalloff));
        
        // Apply enhanced 3D transform effects based on visibility and scroll position
        // but with reduced mouse influence to avoid disorienting effects
        if (visibility > 0) {
            // Base rotation from card position
            const baseRotateY = (rect.left + rect.width / 2 - window.innerWidth / 2) * 0.0001;
            const baseRotateX = (centerY - viewportHeight / 2) * 0.0001;
            
            // Much reduced mouse influence
            const mouseInfluence = 0.2 * visibility;
            const mouseRotateY = mouseX * 2 * mouseInfluence;
            const mouseRotateX = -mouseY * 1 * mouseInfluence;
            
            // Time-based subtle movement
            const timeRotateX = Math.sin(time * 0.5 + index * 0.2) * 0.2 * visibility;
            const timeRotateY = Math.cos(time * 0.5 + index * 0.2) * 0.2 * visibility;
            
            // Combined rotations with reduced intensity
            const totalRotateX = -baseRotateX * visibility * 5 + mouseRotateX + timeRotateX;
            const totalRotateY = baseRotateY * visibility * 5 + mouseRotateY + timeRotateY;
            
            // Simpler transform with fewer effects
            element.style.transform = `
                perspective(1200px)
                rotateX(${totalRotateX}deg)
                rotateY(${totalRotateY}deg)
                scale(${1 + visibility * 0.03})
            `;
            
            // Simpler shadow effect
            element.style.boxShadow = `0 ${5 + visibility * 15}px ${10 + visibility * 20}px rgba(0, 0, 0, ${0.1 + visibility * 0.2})`;
            
            // Smoother transitions
            element.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
        } else {
            // Reset transform when card is not visible
            element.style.transform = 'none';
            element.style.boxShadow = 'none';
        }
    });
}

// Clean up function to be called when needed
function cleanup3DEffects() {
    if (!isInitialized) return;
    
    // Stop animation loop
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Remove event listener
    window.removeEventListener('resize', onWindowResize);
    
    // Remove renderer from DOM
    if (renderer && renderer.domElement) {
        document.body.removeChild(renderer.domElement);
    }
    
    // Reset variables
    scene = null;
    camera = null;
    renderer = null;
    cardElements = [];
    cardObjects = [];
    isInitialized = false;
}

// Initialize effects when the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment for page to settle before initializing 3D effects
    setTimeout(init3DEffects, 500);
});