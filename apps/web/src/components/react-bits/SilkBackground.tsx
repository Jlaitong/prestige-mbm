import React, { useEffect, useRef } from 'react';

interface SilkBackgroundProps {
  color?: string; // Hex color, e.g. '#b7b79e'
  interactive?: boolean;
  className?: string;
  speed?: number;
}

export const SilkBackground: React.FC<SilkBackgroundProps> = ({
  color = '#b7b79e',
  interactive = true,
  className = '',
  speed = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
    };

    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Color parsing for silk sheen calculation
    const baseColor = color.replace('#', '');
    const r = parseInt(baseColor.substring(0, 2), 16) || 183;
    const g = parseInt(baseColor.substring(2, 4), 16) || 183;
    const b = parseInt(baseColor.substring(4, 6), 16) || 158;

    let time = 0;
    const wavesCount = 14;

    const render = () => {
      time += 0.008 * speed;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep base background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, `rgb(${Math.max(0, r - 35)}, ${Math.max(0, g - 35)}, ${Math.max(0, b - 35)})`);
      bgGrad.addColorStop(0.5, `rgb(${r}, ${g}, ${b})`);
      bgGrad.addColorStop(1, `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render flowing silk ribbons with dynamic specular sheen
      for (let i = 0; i < wavesCount; i++) {
        const factor = i / wavesCount;
        ctx.beginPath();

        const waveY = height * (0.15 + factor * 0.85);
        ctx.moveTo(0, waveY);

        for (let x = 0; x <= width; x += 15) {
          const normX = x / width;
          const mouseDist = Math.hypot(normX - mouseRef.current.x, (waveY / height) - mouseRef.current.y);
          const mousePerturb = Math.sin(mouseDist * 10 - time * 2) * (1 - Math.min(1, mouseDist * 2)) * 30;

          const y =
            waveY +
            Math.sin(normX * 4 + time + factor * 3) * 45 +
            Math.cos(normX * 8 - time * 1.5 + factor * 2) * 25 +
            Math.sin(normX * 2 + time * 0.7) * 35 +
            mousePerturb;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Shading and sheen gradient for silk highlights
        const waveGrad = ctx.createLinearGradient(0, waveY - 40, 0, waveY + 80);
        const alpha = 0.12 + Math.sin(time + factor * 4) * 0.06;
        
        // Highlights on the wave crest
        const highlightR = Math.min(255, r + 45);
        const highlightG = Math.min(255, g + 45);
        const highlightB = Math.min(255, b + 45);

        // Shadow in the wave trough
        const shadowR = Math.max(0, r - 40);
        const shadowG = Math.max(0, g - 40);
        const shadowB = Math.max(0, b - 40);

        waveGrad.addColorStop(0, `rgba(${highlightR}, ${highlightG}, ${highlightB}, ${alpha * 1.6})`);
        waveGrad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        waveGrad.addColorStop(1, `rgba(${shadowR}, ${shadowG}, ${shadowB}, ${alpha * 0.6})`);

        ctx.fillStyle = waveGrad;
        ctx.fill();

        // Elegant silk thread outline highlight
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + (i % 2 === 0 ? 0.12 : 0.03)})`;
        ctx.stroke();
      }

      // Luxury satin vignette
      const radialVignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.1,
        width / 2,
        height / 2,
        width * 0.75
      );
      radialVignette.addColorStop(0, 'rgba(255,255,255,0.08)');
      radialVignette.addColorStop(0.6, 'rgba(0,0,0,0)');
      radialVignette.addColorStop(1, 'rgba(0,0,0,0.3)');
      ctx.fillStyle = radialVignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [color, interactive, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
