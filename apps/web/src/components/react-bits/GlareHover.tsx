import React, { useRef, useState, useCallback } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt in degrees (default: 8)
  glareOpacity?: number; // max glare opacity (default: 0.25)
  glareColor?: string; // glare highlight color
  borderRadius?: string;
}

export const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  className = '',
  maxTilt = 7,
  glareOpacity = 0.22,
  glareColor = '#ffffff',
  borderRadius = '1.5rem',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to +1
      const normY = (y / rect.height) * 2 - 1; // -1 to +1

      const rotateY = normX * maxTilt;
      const rotateX = -normY * maxTilt;

      setTransformStyle(
        `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
      );

      setGlareStyle({
        opacity: glareOpacity,
        background: `radial-gradient(circle 280px at ${x}px ${y}px, ${glareColor}, transparent 75%)`,
      });
    },
    [maxTilt, glareOpacity, glareColor]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.12s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        borderRadius,
      }}
    >
      {children}

      {/* Dynamic specular glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-overlay"
        style={{
          ...glareStyle,
          borderRadius,
        }}
        aria-hidden="true"
      />
    </div>
  );
};
