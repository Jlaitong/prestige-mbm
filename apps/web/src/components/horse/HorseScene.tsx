import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const HorseScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Check if horse video asset exists without throwing errors
    const video = document.createElement('video');
    video.src = '/assets/videos/horse/horse-run.mp4';
    video.onloadeddata = () => {
      setHasVideo(true);
      setIsVideoLoaded(true);
    };
    video.onerror = () => {
      setHasVideo(false);
    };

    // Progressive cinematic reveal after hero load
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
        {
          opacity: 0,
          scale: 1.06,
          x: 20,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.6,
          delay: 0.5,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    // Subtle interactive mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!mediaRef.current) return;
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * 16;
      const offsetY = (e.clientY / innerHeight - 0.5) * 16;

      gsap.to(mediaRef.current, {
        x: offsetX,
        y: offsetY,
        duration: 0.8,
        ease: 'power1.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center justify-center pointer-events-none select-none overflow-hidden"
      aria-label="Silueta del Caballo PRESTIGE MBM en movimiento"
    >
      <div
        ref={mediaRef}
        className="w-full h-full max-w-[500px] max-h-[500px] flex items-center justify-center transition-opacity duration-700"
      >
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/horse/horse-silhouette.svg"
            className="w-full h-full object-contain filter drop-shadow-2xl mix-blend-multiply"
          >
            <source src="/assets/videos/horse/horse-run.mp4" type="video/mp4" />
            <source src="/assets/videos/horse/horse-run.webm" type="video/webm" />
          </video>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Cinematic vector presentation */}
            <img
              src="/assets/horse/horse-silhouette.svg"
              alt="Caballo PRESTIGE MBM Bogotá"
              className="w-full h-full max-h-[460px] object-contain opacity-90 transition-transform duration-500"
              loading="lazy"
            />
            {/* Subtle energetic ambient aura */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#e8e8e6] via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
};
