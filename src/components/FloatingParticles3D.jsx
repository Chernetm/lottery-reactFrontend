import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PARTICLE_COUNT = 50;

const generateParticles = () => {
  return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    depth: Math.random() * 1 + 0.5,
    speed: Math.random() * 20 + 20,
  }));
};

const FloatingParticles3D = () => {
  const [particles] = useState(generateParticles());
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 500], [0, -100]);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {particles.map((p) => {
        const gravityX = (mouse.x - 0.5) * 120 * p.depth;
        const gravityY = (mouse.y - 0.5) * 120 * p.depth;

        return (
          <motion.div
            key={p.id}
            style={{ y: parallax }}
            animate={{
              x: [`${p.x}vw`, `${p.x}vw`, `${p.x}vw`],
              y: [`${p.y}vh`, `${p.y - 30}vh`, `${p.y}vh`],
            }}
            transition={{
              duration: p.speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            <motion.div
              animate={{
                x: gravityX,
                y: gravityY,
              }}
              transition={{ type: "spring", stiffness: 40, damping: 20 }}
              className="rounded-full bg-brand-primary/40 blur-sm"
              style={{
                width: p.size,
                height: p.size,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingParticles3D;