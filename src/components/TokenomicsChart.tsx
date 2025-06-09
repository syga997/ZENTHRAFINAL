import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const segments = [
  { label: 'Presale', value: 22, color: '#6b21a8' },
  { label: 'Liquidity', value: 25, color: '#a855f7' },
  { label: 'Marketing', value: 18, color: '#c084fc' },
  { label: 'Team', value: 12, color: '#7c3aed' },
  { label: 'Development', value: 20, color: '#d8b4fe' },
  { label: 'Reserve', value: 5, color: '#e0d7fd' },
];

const TokenomicsChart = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create a donut chart with 3D extrusion for segments
    const group = new THREE.Group();

    const radius = 1.5;
    const thickness = 0.5;

    const total = segments.reduce((acc, seg) => acc + seg.value, 0);
    let startAngle = 0;

    segments.forEach(({ label, value, color }) => {
      const segmentAngle = (value / total) * Math.PI * 2;

      // Geometry: create a ring segment shape
      const shape = new THREE.Shape();

      shape.absarc(0, 0, radius, startAngle, startAngle + segmentAngle, false);
      shape.absarc(0, 0, radius - thickness, startAngle + segmentAngle, startAngle, true);

      const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: false,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshPhongMaterial({ color });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { label, value };

      // Slight rotation on each segment for 3D effect
      mesh.rotation.x = Math.PI / 6;

      group.add(mesh);

      startAngle += segmentAngle;
    });

    scene.add(group);

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.z += 0.005;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="tokenomics-chart-wrapper" ref={mountRef} style={{ width: '100%', height: '400px' }}>
      <p className="text-center mt-4 text-white font-semibold">
        Total Supply: 150,000,000,000 ZTH
      </p>
    </div>
  );
};

export default TokenomicsChart;
