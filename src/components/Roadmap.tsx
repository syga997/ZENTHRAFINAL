import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const roadmapPoints = [
  { quarter: 'Q3 2025', description: 'Launch Zenthra Presale with multi-chain integration and token burn.' },
  { quarter: 'Q4 2025', description: 'Community voting platform launch to drive project decisions.' },
  { quarter: 'Q1 2026', description: 'CEX listings subject to community support and funding.' },
  { quarter: 'Q2 2026', description: 'Expand marketing, partnerships, and development based on presale success.' },
  { quarter: 'Q3 2026', description: 'Launch Zenthra ecosystem tools and wallet integrations.' },
];

const Roadmap = () => {
  const mountRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x9933ff, 1, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create roadmap points as spheres with text labels
    const group = new THREE.Group();
    const loader = new THREE.FontLoader();

    // We'll use a simple sphere + plane with texture for labels because loading fonts and textures might be heavy.
    // For now, create spheres scattered non-linearly.

    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x7c3aed });

    roadmapPoints.forEach((point, idx) => {
      const sphere = new THREE.Mesh(sphereGeometry, material);
      // Scatter points in 3D space non-linear, e.g. spiraling or random in a controlled range
      const angle = idx * (Math.PI * 0.8);
      const radius = 3;
      const x = Math.cos(angle) * radius;
      const y = (idx - roadmapPoints.length / 2) * 1.2;
      const z = Math.sin(angle) * radius;

      sphere.position.set(x, y, z);
      sphere.userData = point;
      group.add(sphere);
    });

    scene.add(group);

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let INTERSECTED: THREE.Object3D | null = null;

    function onMouseMove(event: MouseEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    window.addEventListener('mousemove', onMouseMove);

    // Tooltip div
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.padding = '8px 12px';
    tooltip.style.background = 'rgba(124,58,237,0.85)';
    tooltip.style.color = '#fff';
    tooltip.style.borderRadius = '8px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.fontWeight = '600';
    tooltip.style.transition = 'opacity 0.3s ease';
    tooltip.style.opacity = '0';
    tooltip.style.zIndex = '9999';
    tooltip.style.maxWidth = '280px';
    tooltip.style.fontFamily = "'Poppins', sans-serif";
    document.body.appendChild(tooltip);

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);

      group.rotation.y += 0.004;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(group.children);

      if (intersects.length > 0) {
        if (INTERSECTED !== intersects[0].object) {
          INTERSECTED = intersects[0].object;
          const data = INTERSECTED.userData;
          tooltip.innerHTML = `<strong>${data.quarter}</strong><br/>${data.description}`;
          tooltip.style.opacity = '1';
        }
        const rect = renderer.domElement.getBoundingClientRect();
        tooltip.style.left = `${event.clientX + 15}px`;
        tooltip.style.top = `${event.clientY + 15}px`;
      } else {
        INTERSECTED = null;
        tooltip.style.opacity = '0';
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeChild(tooltip);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto p-6 mt-16 bg-antracit rounded-xl shadow-lg relative text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-kiraly-lila text-center drop-shadow-lg">
        Roadmap
      </h2>
      <div ref={mountRef} style={{ width: '100%', height: '500px' }} />
      <p className="mt-4 text-center italic text-gray-300">
        * CEX listings depend on community support and sufficient funding.
      </p>
    </section>
  );
};

export default Roadmap;
