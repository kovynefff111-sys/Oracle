import React, { useEffect, useRef } from 'react';

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Star {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.0 + 0.5; // Slightly smaller
        // Levitating effect: slow random drift
        this.speedX = (Math.random() - 0.5) * 0.2; 
        this.speedY = (Math.random() - 0.5) * 0.2;
        // Reduced opacity (approx 50% less visibility)
        this.opacity = Math.random() * 0.3 + 0.1; 
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen for continuous levitation
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
        
        // Gentle twinkle (reduced intensity)
        this.opacity += (Math.random() - 0.5) * 0.01;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 0.5) this.opacity = 0.5;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reduced Glow effect
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      }
    }

    let stars: Star[] = [];

    const init = () => {
      stars = [];
      const numberOfStars = (width * height) / 9000; 
      for (let i = 0; i < numberOfStars; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Deep Space Gradient Background - Made Darker/Dark Blue
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
      gradient.addColorStop(0, '#0a0a15'); // Very dark center
      gradient.addColorStop(0.5, '#05050a'); 
      gradient.addColorStop(1, '#000000'); // Black edges
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Connect stars to form constellations
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Connect if close enough
          if (distance < 130) {
            ctx.beginPath();
            // Line opacity fades with distance - Reduced visibility by half
            const opacity = 1 - (distance / 130);
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.15})`; // Gold lines with much lower opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
        // Reset shadow for next iteration/frame performance
        ctx.shadowBlur = 0;
      }

      // Draw Stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resize();
      init();
    });

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default StarBackground;