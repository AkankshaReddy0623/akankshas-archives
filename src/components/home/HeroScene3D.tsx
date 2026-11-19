'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // Track all allocated Three.js resources for complete cleanup
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // Setup Three.js scene
    const scene = new THREE.Scene();
    // Deep near-black fog matching #020202
    scene.fog = new THREE.FogExp2(0x020202, 0.024);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.98;
    container.appendChild(renderer.domElement);

    // ─── Restrained Cinematic Darkroom Lighting ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.22);
    scene.add(ambientLight);

    // Warm Golden Key Light linked to visual identity (#E8B923)
    const goldKeyLight = new THREE.PointLight(0xe8b923, isMobile ? 7 : 11, 35);
    goldKeyLight.position.set(7, 5, 9);
    scene.add(goldKeyLight);

    // Subtle Cool Atmospheric Rim Light
    const rimLight = new THREE.PointLight(0xffffff, 3.5, 28);
    rimLight.position.set(-9, -4, 6);
    scene.add(rimLight);

    // ─── Shared Materials ───
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.16,
      roughness: 0.25,
      metalness: 0.1,
      transmission: 0.25,
      ior: 1.4,
      side: THREE.DoubleSide,
    });
    materialsToDispose.push(glassMaterial);

    const goldBorderMaterial = new THREE.LineBasicMaterial({
      color: 0xe8b923,
      transparent: true,
      opacity: 0.24,
    });
    materialsToDispose.push(goldBorderMaterial);

    const gridLineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.04,
    });
    materialsToDispose.push(gridLineMaterial);

    const cornerMaterial = new THREE.LineBasicMaterial({
      color: 0xe8b923,
      transparent: true,
      opacity: 0.38,
    });
    materialsToDispose.push(cornerMaterial);

    // ─── Layer 1: Floating Photographic Archive Frames ───
    const framesGroup = new THREE.Group();
    scene.add(framesGroup);

    interface FrameItem {
      mesh: THREE.Group;
      initialPos: THREE.Vector3;
      initialRot: THREE.Euler;
      floatSpeed: number;
      depthFactor: number;
    }

    const frameConfigs = isMobile
      ? [
          { w: 3.8, h: 2.6, pos: [-4.6, 2.2, -4.5], rot: [0.06, 0.22, -0.03], floatSpeed: 0.6, depth: 0.8 },
          { w: 3.4, h: 4.2, pos: [4.8, -1.8, -4.8], rot: [-0.05, -0.2, 0.04], floatSpeed: 0.7, depth: 0.9 },
        ]
      : [
          // Left Upper: Wide Landscape Frame
          { w: 5.2, h: 3.4, pos: [-8.2, 2.5, -4.0], rot: [0.08, 0.26, -0.04], floatSpeed: 0.65, depth: 1.2 },
          // Right Upper: Tall Portrait Frame
          { w: 3.6, h: 4.8, pos: [8.4, 2.0, -4.6], rot: [-0.06, -0.24, 0.05], floatSpeed: 0.8, depth: 1.3 },
          // Left Lower: Medium Archival Frame
          { w: 4.4, h: 3.0, pos: [-7.6, -2.6, -3.4], rot: [0.1, -0.16, 0.05], floatSpeed: 0.6, depth: 0.9 },
          // Right Lower: Negative Carrier Plate
          { w: 4.8, h: 3.2, pos: [7.8, -2.4, -5.0], rot: [-0.08, 0.2, -0.07], floatSpeed: 0.85, depth: 1.4 },
        ];

    const frameObjects: FrameItem[] = [];

    frameConfigs.forEach((cfg) => {
      const frameGroup = new THREE.Group();
      frameGroup.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      frameGroup.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);

      // 1. Archival Translucent Glass Plane
      const planeGeo = new THREE.PlaneGeometry(cfg.w, cfg.h);
      geometriesToDispose.push(planeGeo);
      const glassMesh = new THREE.Mesh(planeGeo, glassMaterial);
      frameGroup.add(glassMesh);

      // 2. Golden Wireframe Border
      const edges = new THREE.EdgesGeometry(planeGeo);
      geometriesToDispose.push(edges);
      const borderLine = new THREE.LineSegments(edges, goldBorderMaterial);
      frameGroup.add(borderLine);

      // 3. Rule-of-Thirds Compositional Guides
      const hw = cfg.w / 2;
      const hh = cfg.h / 2;
      const thirdW = cfg.w / 3;
      const thirdH = cfg.h / 3;

      const gridPts = [
        -hw + thirdW, -hh, 0.01, -hw + thirdW, hh, 0.01,
        -hw + thirdW * 2, -hh, 0.01, -hw + thirdW * 2, hh, 0.01,
        -hw, -hh + thirdH, 0.01, hw, -hh + thirdH, 0.01,
        -hw, -hh + thirdH * 2, 0.01, hw, -hh + thirdH * 2, 0.01,
      ];
      const gridGeo = new THREE.BufferGeometry();
      gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridPts, 3));
      geometriesToDispose.push(gridGeo);
      const gridMesh = new THREE.LineSegments(gridGeo, gridLineMaterial);
      frameGroup.add(gridMesh);

      // 4. Optical Viewfinder Precision Corner Markers
      const cSize = Math.min(cfg.w, cfg.h) * 0.12;
      const cornerPts = [
        -hw, hh - cSize, 0.02, -hw, hh, 0.02,
        -hw, hh, 0.02, -hw + cSize, hh, 0.02,
        hw - cSize, hh, 0.02, hw, hh, 0.02,
        hw, hh, 0.02, hw, hh - cSize, 0.02,
        hw, -hh + cSize, 0.02, hw, -hh, 0.02,
        hw, -hh, 0.02, hw - cSize, -hh, 0.02,
        -hw + cSize, -hh, 0.02, -hw, -hh, 0.02,
        -hw, -hh, 0.02, -hw, -hh + cSize, 0.02,
      ];
      const cornerGeo = new THREE.BufferGeometry();
      cornerGeo.setAttribute('position', new THREE.Float32BufferAttribute(cornerPts, 3));
      geometriesToDispose.push(cornerGeo);
      const corners = new THREE.LineSegments(cornerGeo, cornerMaterial);
      frameGroup.add(corners);

      framesGroup.add(frameGroup);
      frameObjects.push({
        mesh: frameGroup,
        initialPos: new THREE.Vector3(...cfg.pos),
        initialRot: new THREE.Euler(...cfg.rot),
        floatSpeed: cfg.floatSpeed,
        depthFactor: cfg.depth,
      });
    });

    // ─── Layer 2: Optical Lens Aperture Ring ───
    const opticsGroup = new THREE.Group();
    scene.add(opticsGroup);

    const ringRadius = isMobile ? 1.9 : 2.4;
    const ringPos = isMobile ? [-5.5, -1.8, -4.5] : [-8.5, -1.0, -4.2];

    const rGroup = new THREE.Group();
    rGroup.position.set(ringPos[0], ringPos[1], ringPos[2]);

    const outerRingGeo = new THREE.RingGeometry(ringRadius - 0.015, ringRadius, 64);
    geometriesToDispose.push(outerRingGeo);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xe8b923,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide,
    });
    materialsToDispose.push(outerRingMat);
    rGroup.add(new THREE.Mesh(outerRingGeo, outerRingMat));

    // Aperture f-stop tick marks
    const tickGeo = new THREE.BufferGeometry();
    const tickPts: number[] = [];
    const tickCount = 24;
    for (let i = 0; i < tickCount; i++) {
      const theta = (i / tickCount) * Math.PI * 2;
      const r1 = ringRadius - (i % 6 === 0 ? 0.22 : 0.1);
      const r2 = ringRadius - 0.03;
      tickPts.push(Math.cos(theta) * r1, Math.sin(theta) * r1, 0.01);
      tickPts.push(Math.cos(theta) * r2, Math.sin(theta) * r2, 0.01);
    }
    tickGeo.setAttribute('position', new THREE.Float32BufferAttribute(tickPts, 3));
    geometriesToDispose.push(tickGeo);
    const tickMat = new THREE.LineBasicMaterial({ color: 0xe8b923, transparent: true, opacity: 0.3 });
    materialsToDispose.push(tickMat);
    rGroup.add(new THREE.LineSegments(tickGeo, tickMat));

    opticsGroup.add(rGroup);

    // ─── Layer 3: Ambient Golden Dust Particles ───
    const particleCount = isMobile ? 24 : 55;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 38;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    geometriesToDispose.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: 0xe8b923,
      size: isMobile ? 0.08 : 0.10,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    materialsToDispose.push(particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Cursor Parallax Tracking ───
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = nx * 1.6;
      targetY = ny * 1.1;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pause when offscreen or tab hidden
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ─── Animation Loop ───
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      camera.position.x = currentX;
      camera.position.y = currentY;
      camera.rotation.z = -currentX * 0.006;
      camera.lookAt(0, 0, 0);

      // Light follows mouse subtly
      goldKeyLight.position.x = 7 + currentX * 1.4;
      goldKeyLight.position.y = 5 + currentY * 1.1;

      // Animate floating photographic frames with gentle harmonic breathing
      frameObjects.forEach((obj, idx) => {
        const floatOffset = Math.sin(elapsed * obj.floatSpeed + idx * 1.2) * 0.25;
        const driftOffset = Math.cos(elapsed * (obj.floatSpeed * 0.7) + idx) * 0.18;

        obj.mesh.position.y = obj.initialPos.y + floatOffset - currentY * 0.12 * obj.depthFactor;
        obj.mesh.position.x = obj.initialPos.x + driftOffset - currentX * 0.16 * obj.depthFactor;

        obj.mesh.rotation.y = obj.initialRot.y + Math.sin(elapsed * 0.35 + idx) * 0.04 + currentX * 0.015;
        obj.mesh.rotation.x = obj.initialRot.x + Math.cos(elapsed * 0.3 + idx) * 0.03 - currentY * 0.015;
      });

      // Slowly rotate aperture ring
      rGroup.rotation.z += 0.002;

      // Slowly drift particle constellation
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = elapsed * 0.006;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      observer.disconnect();

      // Dispose all geometries and materials to prevent GPU memory leaks
      geometriesToDispose.forEach((geo) => geo.dispose());
      materialsToDispose.forEach((mat) => mat.dispose());

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Subtle Warm Ambient Accent */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-radial from-[#E8B923]/3 via-transparent to-transparent blur-3xl opacity-30 pointer-events-none" />
    </div>
  );
}
