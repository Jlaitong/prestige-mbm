import React, { useEffect, useState } from 'react';
import { SilkBackground } from '../react-bits/SilkBackground';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    // Deliberate luxury pacing (~2.2 seconds) so user experiences the horse mark and silk motion
    const startTime = Date.now();
    const duration = 2200; // 2.2 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 700); // Wait for fade-out transition
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: '#b7b79e' }}
      aria-label="Cargando experiencia PRESTIGE MBM"
    >
      {/* Dynamic Silk Liquid Wave Canvas Background */}
      <SilkBackground color="#b7b79e" interactive speed={1.1} />

      {/* Center Branding Showcase Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Official Brand Logo with Horse Silhouette */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mb-4 filter drop-shadow-2xl">
          <img
            src="/assets/branding/prestige-official-logo.svg"
            alt="PRESTIGE MBM Bogotá"
            className="w-full h-full object-contain transform transition-transform duration-1000 ease-out"
            style={{
              transform: `scale(${0.92 + (progress / 100) * 0.08})`,
            }}
          />
        </div>

        {/* Micro Subtitle & City */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[1px] w-6 bg-[#121212]/40" />
          <span className="font-brand font-bold text-[10px] tracking-[0.35em] text-[#121212]/80 uppercase">
            BOGOTÁ • TALLER CENTRAL
          </span>
          <span className="h-[1px] w-6 bg-[#121212]/40" />
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="w-44 flex flex-col items-center gap-2">
          <div className="w-full h-[2px] bg-[#121212]/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#121212] transition-all duration-75 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between w-full text-[9px] font-brand font-black text-[#121212]/60 tracking-widest uppercase">
            <span>PRESTIGE MBM</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
