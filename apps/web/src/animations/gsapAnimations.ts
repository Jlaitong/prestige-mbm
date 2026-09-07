import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroAnimation(container: HTMLElement) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return () => {};

  const ctx = gsap.context(() => {
    // Staggered reveal for hero typography
    gsap.from('.hero-reveal', {
      y: 40,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
    });

    // Subtitle fade
    gsap.from('.hero-sub-reveal', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.4,
      ease: 'power2.out',
    });
  }, container);

  return () => ctx.revert();
}

export function initSectionScrollTrigger(triggerEl: HTMLElement, targets: string) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return () => {};

  const ctx = gsap.context(() => {
    gsap.from(targets, {
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, triggerEl);

  return () => ctx.revert();
}
