"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2 } from "lucide-react";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const SonicWaveformCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationFrameId = 0;
    let time = 0;
    let devicePixelRatio = 1;

    const resizeCanvas = () => {
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * devicePixelRatio);
      canvas.height = Math.floor(window.innerHeight * devicePixelRatio);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const center = height / 2;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      const lineCount = 60;
      const segmentCount = 80;

      for (let i = 0; i < lineCount; i += 1) {
        ctx.beginPath();
        const progress = i / lineCount;
        const colorIntensity = Math.sin(progress * Math.PI);
        ctx.strokeStyle = `rgba(0, 255, 192, ${colorIntensity * 0.5})`;
        ctx.lineWidth = 1.5;

        for (let j = 0; j <= segmentCount; j += 1) {
          const x = (j / segmentCount) * width;
          const distToMouse = Math.hypot(x - mouse.x, center - mouse.y);
          const mouseEffect = Math.max(0, 1 - distToMouse / 400);
          const noise = Math.sin(j * 0.1 + time + i * 0.2) * 20;
          const spike =
            Math.cos(j * 0.2 + time + i * 0.1) *
            Math.sin(j * 0.05 + time) *
            50;
          const y = center + noise + spike * (1 + mouseEffect * 2);

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full bg-black"
      aria-hidden="true"
    />
  );
};

const SonicWaveformHero = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        ease: "easeInOut" as const,
      },
    }),
  };

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <SonicWaveformCanvas />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="relative z-20 p-6 text-center">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className={cn(
            "mb-6 inline-flex items-center gap-2 rounded-full border",
            "border-teal-500/20 bg-teal-500/10 px-4 py-1.5 backdrop-blur-sm",
          )}
        >
          <BarChart2 className="h-4 w-4 text-teal-300" />
          <span className="text-sm font-medium text-gray-200">
            Maritime Signal Intelligence
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-7xl"
        >
          See the ocean more clearly.
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-10 max-w-2xl text-lg text-gray-400"
        >
          Mariscope brings radar, AIS and GNSS-R together to find unmatched vessels,
          protect fishing zones and respond to possible oil spills.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <button className="mx-auto flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-black shadow-lg transition-colors duration-300 hover:bg-gray-200">
            Explore the missions
            <ArrowRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default SonicWaveformHero;
