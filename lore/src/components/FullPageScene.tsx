'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/* ── drifting particles ── */
function Particles({ count = 600 }) {
  const mesh = useRef<THREE.Points>(null!);

  const [positions, speeds] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 40;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
      s[i] = 0.2 + Math.random() * 0.5;
    }
    return [p, s];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.02;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6C5CE7"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── orbital rings ── */
function OrbitalRings() {
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.03;
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
  });

  return (
    <group ref={group}>
      {[2.5, 3.2, 4.0].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
          <torusGeometry args={[radius, 0.008, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? '#6C5CE7' : i === 1 ? '#00D2FF' : '#FDCB6E'}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── floating data streams (thin lines) ── */
function DataStreams() {
  const lines = useRef<THREE.Group>(null!);

  const lineData = useMemo(() => {
    const data: { start: THREE.Vector3; end: THREE.Vector3; color: string }[] = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 20;
      const r = 3 + Math.random() * 2;
      data.push({
        start: new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r),
        end: new THREE.Vector3(Math.cos(angle + 0.3) * r, y + (Math.random() - 0.5) * 3, Math.sin(angle + 0.3) * r),
        color: ['#6C5CE7', '#00D2FF', '#FDCB6E'][i % 3],
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!lines.current) return;
    lines.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={lines}>
      {lineData.map((ld, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([...ld.start.toArray(), ...ld.end.toArray()]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={ld.color} transparent opacity={0.08} />
        </line>
      ))}
    </group>
  );
}

/* ── central icosahedron ── */
function Core() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial
        color="#6C5CE7"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

/* ── camera rig ── */
function CameraRig() {
  useFrame(({ camera, clock }) => {
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.5;
    camera.position.y = Math.cos(clock.getElapsedTime() * 0.03) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── exported full-page scene ── */
export default function FullPageScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <CameraRig />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#6C5CE7" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00D2FF" />
        <Particles count={600} />
        <OrbitalRings />
        <DataStreams />
        <Core />
      </Canvas>
    </div>
  );
}
