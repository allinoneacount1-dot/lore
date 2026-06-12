'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 2000;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color('#6C5CE7');
    const color2 = new THREE.Color('#00D2FF');
    const color3 = new THREE.Color('#FDCB6E');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const colorChoice = Math.random();
      const c = colorChoice < 0.5 ? color1 : colorChoice < 0.85 ? color2 : color3;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.1;
      ring1Ref.current.rotation.z = t * 0.05;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.08;
      ring2Ref.current.rotation.x = t * 0.03;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.06;
      ring3Ref.current.rotation.y = t * 0.04;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#6C5CE7" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[4.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00D2FF" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[5.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#FDCB6E" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshBasicMaterial color="#6C5CE7" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#6C5CE7" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </Float>
  );
}

function DataStreams() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const lineObjects = useMemo(() => {
    const result = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 6 + Math.random() * 3;
      const height = (Math.random() - 0.5) * 8;
      const points: [number, number, number][] = [
        [0, 0, 0],
        [Math.cos(angle) * radius, height, Math.sin(angle) * radius],
      ];
      const color = i % 3 === 0 ? '#00D2FF' : i % 3 === 1 ? '#6C5CE7' : '#FDCB6E';
      result.push({ points, color });
    }
    return result;
  }, []);

  return (
    <group ref={linesRef}>
      {lineObjects.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color={line.color}
          lineWidth={1}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#6C5CE7" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D2FF" />
        <ParticleField />
        <OrbitalRings />
        <CentralOrb />
        <DataStreams />
        <Stars radius={50} depth={50} count={1000} factor={3} saturation={0.5} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
