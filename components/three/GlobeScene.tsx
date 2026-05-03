"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 2;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial size={0.008} color="#58a6ff" transparent opacity={0.6} depthWrite={false} />
    </Points>
  );
}

function WireframeGlobe() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="#58a6ff" wireframe opacity={0.12} transparent />
    </mesh>
  );
}

function InnerGlow() {
  return (
    <mesh>
      <sphereGeometry args={[0.96, 32, 32]} />
      <meshBasicMaterial color="#0d1117" />
    </mesh>
  );
}

function GridRings() {
  const rings = useMemo(() => {
    return [-0.6, 0, 0.6].map((y) => {
      const r = Math.sqrt(1 - y * y);
      return { y, r };
    });
  }, []);

  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={ref}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, ring.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.r - 0.01, ring.r, 64]} />
          <meshBasicMaterial color="#a371f7" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#58a6ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a371f7" />
      <InnerGlow />
      <WireframeGlobe />
      <GridRings />
      <ParticleField />
    </Canvas>
  );
}
