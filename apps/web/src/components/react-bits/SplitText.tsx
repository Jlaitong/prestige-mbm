import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
  delay?: number;
  by?: 'chars' | 'words';
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  as: Component = 'h2',
  stagger = 0.03,
  delay = 0.1,
  by = 'chars',
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const items = el.querySelectorAll('.split-item');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 28,
          rotateX: -30,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [text, stagger, delay, by]);

  if (by === 'words') {
    const words = text.split(' ');
    return (
      <Component ref={containerRef as any} className={`inline-block perspective-[800px] ${className}`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block whitespace-nowrap mr-[0.28em]">
            <span className="split-item inline-block transform-gpu will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // Split by characters
  const words = text.split(' ');
  return (
    <Component ref={containerRef as any} className={`inline-block perspective-[800px] ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="split-item inline-block transform-gpu will-change-transform"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
};
