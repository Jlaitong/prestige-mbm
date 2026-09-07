import React, { useEffect, useState } from 'react';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    // Elegant short duration (700ms) without artificial lag
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 400);
    }, 700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#121212] text-[#e8e8e6] flex flex-col items-center justify-center transition-opacity duration-400 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src="/assets/branding/horse-logo.svg"
          alt="PRESTIGE MBM"
          className="w-12 h-12 invert mb-4 animate-pulse"
        />
        <h1 className="font-brand font-black text-3xl tracking-tighter text-white">
          PRESTIGE
        </h1>
        <div className="flex items-center gap-2 mt-1 mb-6">
          <span className="h-[2px] w-4 bg-[#e8e8e6]" />
          <span className="font-brand font-bold text-xs tracking-[0.3em] text-[#888]">
            MBM
          </span>
          <span className="h-[2px] w-4 bg-[#e8e8e6]" />
        </div>
        <div className="w-24 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div className="w-full h-full bg-white animate-indeterminate" />
        </div>
      </div>
    </div>
  );
};
