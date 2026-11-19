'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AmbientScene3D — Persistent Cinematic 3D Background Environment
 *
 * Sits at z-0 strictly behind all website content.
 * Delivers:
 * 1. Multi-strata ambient particle field (champagne-gold & muted ivory silver dust).
 * 2. Subtle moving atmospheric lighting that evolves continuously across page scroll.
 * 3. Spatial camera viewfinder framing wireframes and delicate rule-of-thirds guidelines.
 * 4. Desktop pointer-reactive parallax depth and smooth scroll-linked evolution.
 * 5. Full WebGL lifecycle management, visibility pausing, and resource disposal.
 */
export default function AmbientScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // 2. WebGL availability check
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

    // Track resources for complete memory cleanup
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // ─── Scene & Fog ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020202, 0.026);

    // ─── Camera ───
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 24);

    // ─── Renderer ───
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    container.appendChild(renderer.domElement);

    // ─── Atmospheric Lighting (Subtle, Restrained, Darkroom-Level) ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    // Moving Warm Golden Key Light (Subtle localized warmth #E8B923)
    const goldLight = new THREE.PointLight(0xe8b923, isMobile ? 3.5 : 5.5, 32);
    goldLight.position.set(10, 8, 12);
    scene.add(goldLight);

    // Moving Cool Charcoal Rim Light
    const coolLight = new THREE.PointLight(0x707070, isMobile ? 1.8 : 2.8, 28);
    coolLight.position.set(-12, -10, 8);
    scene.add(coolLight);

    // ─── Layer 1: Multi-Strata Ambient Particle Constellations ───
    // Stratum A: Champagne Gold Ambient Dust (Restrained, fine particles)
    const goldCount = isMobile ? 22 : 48;
    const goldGeo = new THREE.BufferGeometry();
    const goldPositions = new Float32Array(goldCount * 3);
    const goldSpeeds = new Float32Array(goldCount * 3);

    for (let i = 0; i < goldCount; i++) {
      goldPositions[i * 3] = (Math.random() - 0.5) * 50;
      goldPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      goldPositions[i * 3 + 2] = (Math.random() - 0.5) * 35 - 5;

      goldSpeeds[i * 3] = (Math.random() - 0.5) * 0.1; // drift X
      goldSpeeds[i * 3 + 1] = 0.05 + Math.random() * 0.14; // gentle upward current
      goldSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 0.08; // drift Z
    }

    goldGeo.setAttribute('position', new THREE.BufferAttribute(goldPositions, 3));
    geometriesToDispose.push(goldGeo);

    const goldMat = new THREE.PointsMaterial({
      color: 0xe8b923,
      size: isMobile ? 0.08 : 0.11,
      transparent: true,
      opacity: 0.20,
      blending: THREE.AdditiveBlending,
    });
    materialsToDispose.push(goldMat);

    const goldParticles = new THREE.Points(goldGeo, goldMat);
    scene.add(goldParticles);

    // Stratum B: Muted Ivory / Soft Silver Halide Crystals
    const ivoryCount = isMobile ? 16 : 32;
    const ivoryGeo = new THREE.BufferGeometry();
    const ivoryPositions = new Float32Array(ivoryCount * 3);

    for (let i = 0; i < ivoryCount; i++) {
      ivoryPositions[i * 3] = (Math.random() - 0.5) * 45;
      ivoryPositions[i * 3 + 1] = (Math.random() - 0.5) * 55;
      ivoryPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 8;
    }

    ivoryGeo.setAttribute('position', new THREE.BufferAttribute(ivoryPositions, 3));
    geometriesToDispose.push(ivoryGeo);

    const ivoryMat = new THREE.PointsMaterial({
      color: 0xc8c8c8,
      size: isMobile ? 0.06 : 0.08,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    materialsToDispose.push(ivoryMat);

    const ivoryParticles = new THREE.Points(ivoryGeo, ivoryMat);
    scene.add(ivoryParticles);

    // ─── Layer 2: Spatial Photographic Framing Viewfinders ───
    const spatialGroup = new THREE.Group();
    scene.add(spatialGroup);

    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xe8b923,
      transparent: true,
      opacity: 0.09,
    });
    materialsToDispose.push(wireframeMat);

    const mutedLineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.035,
    });
    materialsToDispose.push(mutedLineMat);

    interface ViewfinderObj {
      group: THREE.Group;
      basePos: THREE.Vector3;
      baseRot: THREE.Euler;
      floatSpeed: number;
      scrollFactor: number;
    }

    const viewfinderConfigs = isMobile
      ? [
          { w: 6.5, h: 4.5, pos: [-8, 4, -12], rot: [0.05, 0.2, -0.04], floatSpeed: 0.5, scrollFactor: 0.35 },
          { w: 5.5, h: 7.5, pos: [8, -10, -14], rot: [-0.06, -0.18, 0.05], floatSpeed: 0.6, scrollFactor: 0.45 },
        ]
      : [
          // Upper-right background viewfinder (Hero/Photography margin)
          { w: 9.0, h: 6.0, pos: [14, 6, -10], rot: [0.06, -0.22, 0.04], floatSpeed: 0.55, scrollFactor: 0.35 },
          // Lower-left background viewfinder (Photography/About transition)
          { w: 7.5, h: 10.5, pos: [-15, -8, -12], rot: [-0.08, 0.25, -0.05], floatSpeed: 0.65, scrollFactor: 0.45 },
          // Far deep archival frame (About/Contact margin)
          { w: 12.0, h: 8.0, pos: [12, -24, -16], rot: [0.04, -0.15, 0.02], floatSpeed: 0.45, scrollFactor: 0.55 },
        ];

    const viewfinderObjects: ViewfinderObj[] = [];

    viewfinderConfigs.forEach((cfg) => {
      const vGroup = new THREE.Group();
      vGroup.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      vGroup.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);

      const hw = cfg.w / 2;
      const hh = cfg.h / 2;

      // Outer boundary rectangle
      const rectPts = [
        -hw, -hh, 0, hw, -hh, 0,
        hw, -hh, 0, hw, hh, 0,
        hw, hh, 0, -hw, hh, 0,
        -hw, hh, 0, -hw, -hh, 0,
      ];
      const rectGeo = new THREE.BufferGeometry();
      rectGeo.setAttribute('position', new THREE.Float32BufferAttribute(rectPts, 3));
      geometriesToDispose.push(rectGeo);
      vGroup.add(new THREE.LineSegments(rectGeo, wireframeMat));

      // Precision viewfinder corner brackets
      const c = Math.min(cfg.w, cfg.h) * 0.14;
      const cornerPts = [
        -hw, hh - c, 0.01, -hw, hh, 0.01,
        -hw, hh, 0.01, -hw + c, hh, 0.01,
        hw - c, hh, 0.01, hw, hh, 0.01,
        hw, hh, 0.01, hw, hh - c, 0.01,
        hw, -hh + c, 0.01, hw, -hh, 0.01,
        hw, -hh, 0.01, hw - c, -hh, 0.01,
        -hw + c, -hh, 0.01, -hw, -hh, 0.01,
        -hw, -hh, 0.01, -hw, -hh + c, 0.01,
      ];
      const cornerGeo = new THREE.BufferGeometry();
      cornerGeo.setAttribute('position', new THREE.Float32BufferAttribute(cornerPts, 3));
      geometriesToDispose.push(cornerGeo);
      vGroup.add(new THREE.LineSegments(cornerGeo, wireframeMat));

      // Delicate center optical crosshair
      const ch = 0.35;
      const crossPts = [-ch, 0, 0.01, ch, 0, 0.01, 0, -ch, 0.01, 0, ch, 0.01];
      const crossGeo = new THREE.BufferGeometry();
      crossGeo.setAttribute('position', new THREE.Float32BufferAttribute(crossPts, 3));
      geometriesToDispose.push(crossGeo);
      vGroup.add(new THREE.LineSegments(crossGeo, mutedLineMat));

      spatialGroup.add(vGroup);
      viewfinderObjects.push({
        group: vGroup,
        basePos: new THREE.Vector3(...cfg.pos),
        baseRot: new THREE.Euler(...cfg.rot),
        floatSpeed: cfg.floatSpeed,
        scrollFactor: cfg.scrollFactor,
      });
    });

    // ─── Pointer & Scroll State ───
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;
    let scrollYNormalized = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPointerX = nx * 1.8;
      targetPointerY = ny * 1.3;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollYNormalized = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─── Resize & Visibility ───
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ─── Animation Loop ───
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth pointer interpolation
      currentPointerX += (targetPointerX - currentPointerX) * 0.035;
      currentPointerY += (targetPointerY - currentPointerY) * 0.035;

      // Scroll-driven camera evolution across the entire page
      // Camera smoothly tracks downwards with scroll progress, revealing deeper spatial strata
      const targetCameraY = -scrollYNormalized * 22 + currentPointerY * 0.8;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.position.x = currentPointerX * 0.9;
      camera.rotation.z = -currentPointerX * 0.005;

      // Dynamic atmospheric lighting shifts with scroll section progression
      // Hero (scroll 0-20%): warm center-right glow
      // Photography (scroll 20-60%): golden light drifts downward across margin
      // About (scroll 60-85%): cool soft light drifts center
      // Contact (scroll 85-100%): golden light converges on contact section
      goldLight.position.x = 10 + Math.sin(elapsed * 0.25) * 5 + currentPointerX * 2;
      goldLight.position.y = -scrollYNormalized * 20 + Math.cos(elapsed * 0.3) * 3;
      goldLight.intensity = isMobile
        ? 3.2 + Math.sin(elapsed * 0.4) * 0.8
        : 5.5 + Math.sin(elapsed * 0.35) * 1.2;

      coolLight.position.x = -12 + Math.cos(elapsed * 0.2) * 4;
      coolLight.position.y = -scrollYNormalized * 18 + Math.sin(elapsed * 0.35) * 4;

      // Slowly drift gold particles with gentle harmonic upward current
      const gPos = goldGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < goldCount; i++) {
        gPos[i * 3 + 1] += goldSpeeds[i * 3 + 1] * 0.04;
        gPos[i * 3] += Math.sin(elapsed * 0.4 + i) * 0.008;

        // Wrap around vertically to maintain infinite organic dust field
        if (gPos[i * 3 + 1] > 35) {
          gPos[i * 3 + 1] = -35;
        }
      }
      goldGeo.attributes.position.needsUpdate = true;

      // Slow deep rotation for ivory crystal constellation
      ivoryParticles.rotation.y = elapsed * 0.012;
      ivoryParticles.rotation.x = elapsed * 0.005;

      // Animate photographic viewfinders with breathing harmonic drift & scroll-linked travel
      viewfinderObjects.forEach((vf, idx) => {
        const floatY = Math.sin(elapsed * vf.floatSpeed + idx) * 0.35;
        const driftX = Math.cos(elapsed * (vf.floatSpeed * 0.8) + idx) * 0.25;

        // Apply scroll offset with parallax factor
        vf.group.position.y = vf.basePos.y + floatY - scrollYNormalized * 14 * vf.scrollFactor;
        vf.group.position.x = vf.basePos.x + driftX - currentPointerX * 0.35;

        vf.group.rotation.y = vf.baseRot.y + Math.sin(elapsed * 0.3 + idx) * 0.03 + currentPointerX * 0.012;
        vf.group.rotation.x = vf.baseRot.x + Math.cos(elapsed * 0.25 + idx) * 0.02 - currentPointerY * 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Complete GPU memory cleanup
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());

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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    />
  );
}
