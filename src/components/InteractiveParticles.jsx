import { useEffect, useRef } from "react";

const InteractiveParticles = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Settings
    const radius = 1.5;           // Smaller dots
    const repelDistance = 80;     // Distance from mouse to repel
    const particleGap = 60;       // Fewer particles = larger gap

    let tick = 0;
    let cols, rows, spacingX, spacingY;

    // Responsive grid
    const updateGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      cols = Math.floor(canvas.width / particleGap);
      rows = Math.floor(canvas.height / particleGap);
      spacingX = canvas.width / cols;
      spacingY = canvas.height / rows;
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const baseX = x * spacingX + spacingX / 2;
          const baseY = y * spacingY + spacingY / 2;

          // Idle floating animation
          const amplitude = 5; // Increase for more movement
          const speed = 0.04;
          
          const idleX = Math.sin(tick * speed + x * 0.6 + y * 0.3) * amplitude;
          const idleY = Math.cos(tick * speed + x * 0.3 + y * 0.6) * amplitude;
          
          let offsetX = idleX;
          let offsetY = idleY;
          
          

          const dx = baseX - mouseRef.current.x;
          const dy = baseY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Repel effect
          if (dist < repelDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (repelDistance - dist) / repelDistance;
            offsetX += Math.cos(angle) * force * 15;
            offsetY += Math.sin(angle) * force * 15;
          }

          ctx.beginPath();
          ctx.arc(baseX + offsetX, baseY + offsetY, radius, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
      }

      tick += 1;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", updateGrid);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
};

export default InteractiveParticles;
