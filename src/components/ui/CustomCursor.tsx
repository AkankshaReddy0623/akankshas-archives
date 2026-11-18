'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let mouseX = -200;
    let mouseY = -200;
    let currentX = -200;
    let currentY = -200;
    let isVisible = false;
    let isHoveringPhoto = false;
    let isHoveringInteractive = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        currentX = mouseX;
        currentY = mouseY;
      }

      // Check target element to detect interactive states softly
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, textarea, select');
        const photo = target.closest('[data-cursor="photo"], .gallery-item, [href^="/photography/"]');
        isHoveringInteractive = Boolean(interactive);
        isHoveringPhoto = Boolean(photo && !interactive);
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    const onMouseEnter = () => {
      isVisible = true;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      animId = requestAnimationFrame(render);

      if (!glowRef.current) return;

      if (!isVisible) {
        glowRef.current.style.opacity = '0';
        return;
      }

      // Smooth organic lerp interpolation (gentle physical lag)
      currentX += (mouseX - currentX) * 0.14;
      currentY += (mouseY - currentY) * 0.14;

      // Subtle scale and opacity response to hovered context
      const targetOpacity = isHoveringPhoto ? 0.18 : isHoveringInteractive ? 0.12 : 0.07;
      const targetScale = isHoveringPhoto ? 1.25 : isHoveringInteractive ? 1.1 : 1.0;

      glowRef.current.style.opacity = String(targetOpacity);
      glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${targetScale})`;
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 h-[380px] w-[380px] rounded-full opacity-0 transition-opacity duration-300 ease-out"
      style={{
        background:
          'radial-gradient(circle at center, rgba(232, 185, 35, 0.45) 0%, rgba(232, 185, 35, 0.16) 30%, rgba(232, 185, 35, 0.04) 55%, transparent 72%)',
        willChange: 'transform, opacity',
      }}
    />
  );
}
