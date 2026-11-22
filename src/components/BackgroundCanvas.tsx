import { useEffect, useRef, useState } from 'react';
import { DesignSettings } from '../types';

interface BackgroundCanvasProps {
  settings: DesignSettings;
  mouseX: number;
  mouseY: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function BackgroundCanvas({ settings, mouseX, mouseY }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Theme colors mapping
  const getThemeColors = () => {
    switch (settings.accentTheme) {
      case 'violet-pink':
        return ['rgba(168, 85, 247, 0.4)', 'rgba(236, 72, 153, 0.4)'];
      case 'emerald-gold':
        return ['rgba(16, 185, 129, 0.4)', 'rgba(245, 158, 11, 0.4)'];
      case 'cyan-red':
      default:
        return ['rgba(6, 182, 212, 0.4)', 'rgba(239, 68, 68, 0.4)'];
    }
  };

  // Set up resize observer on container
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);
    
    // Initial size
    setDimensions({
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    return () => resizeObserver.disconnect();
  }, []);

  // Run the particle loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particles: Particle[] = [];
    const colors = getThemeColors();

    // Create initial particles
    const createParticle = (isInitial = false): Particle => {
      const radius = Math.random() * 3 + 1;
      const themeColor = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * dimensions.width,
        y: isInitial ? Math.random() * dimensions.height : dimensions.height + 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.2, // Drift upwards
        radius,
        alpha: Math.random() * 0.5 + 0.1,
        color: themeColor,
      };
    };

    // Populate
    for (let i = 0; i < settings.particleCount; i++) {
      particles.push(createParticle(true));
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Manage particle array length if settings update dynamically
      if (particles.length < settings.particleCount) {
        particles.push(createParticle(false));
      } else if (particles.length > settings.particleCount) {
        particles.pop();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Interactive repel from mouse
        if (mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const force = (180 - dist) / 180;
            const angle = Math.atan2(dy, dx);
            // Move away gently
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Draw particle with gorgeous glow
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.radius * 2;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Recycle if out of bounds (top or left/right)
        if (p.y < -10 || p.x < -10 || p.x > dimensions.width + 10) {
          particles[i] = createParticle(false);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, settings.particleCount, settings.accentTheme, mouseX, mouseY]);

  return (
    <div id="ambient-container" ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
