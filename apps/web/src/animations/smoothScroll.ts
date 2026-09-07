import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth luxury easing
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/**
 * Smoothly scrolls to any element or selector with luxury easing
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) {
  if (options?.immediate) {
    if (lenisInstance) {
      lenisInstance.scrollTo(target, { immediate: true });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      el?.scrollIntoView({ behavior: 'auto' });
    }
    return;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration: options?.duration ?? 1.4,
      offset: options?.offset ?? -70,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Resets window scroll smoothly or instantly to top (0,0)
 */
export function scrollToTop(immediate: boolean = true) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: immediate ? 'auto' : 'smooth',
  });
}
