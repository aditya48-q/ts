import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function useScrollIntensity() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const heroMix = THREE.MathUtils.clamp(1 - scrollProgress / 18, 0, 1);
  const projectMix = THREE.MathUtils.clamp((scrollProgress - 18) / 28, 0, 1);
  const contactMix = THREE.MathUtils.clamp((scrollProgress - 62) / 25, 0, 1);

  return { heroMix, projectMix, contactMix };
}

function FloatingPoints({ density = 1, tint = '#7dd3fc', radiusOffset = 0 }: { density?: number; tint?: string; radiusOffset?: number }) {
  const points = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = Math.floor(300 * density);
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < positions.length; index += 3) {
      const radius = 4.5 + radiusOffset + Math.random() * (5.5 + density * 2);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    ref.current.rotation.y += delta * 0.06;
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.15, 0.04);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, mouse.x * 0.12, 0.04);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.45, 0.02);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.35, 0.02);
  });

  return (
    <points ref={ref} geometry={points}>
      <pointsMaterial size={0.04} color={tint} sizeAttenuation transparent opacity={0.62} depthWrite={false} />
    </points>
  );
}

function FloatingSpheres({ contactMix }: { contactMix: number }) {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.18, 0.03);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.x * 0.7, 0.03);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, mouse.y * 0.45, 0.03);
    group.current.scale.lerp(new THREE.Vector3(1 - contactMix * 0.08, 1 - contactMix * 0.08, 1 - contactMix * 0.08), 0.04);
  });

  return (
    <group ref={group}>
      <mesh position={[-2.8, 1.4, -1.2]} scale={1 + contactMix * 0.06}>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshPhysicalMaterial
          color="#60a5fa"
          emissive="#1d4ed8"
          emissiveIntensity={0.45}
          roughness={0.12}
          metalness={0.1}
          transmission={0.8}
          thickness={0.8}
          transparent
          opacity={0.48}
        />
      </mesh>
      <mesh position={[2.1, -0.8, -0.6]} scale={1 + contactMix * 0.1}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={0.42}
          roughness={0.1}
          metalness={0.12}
          transmission={0.82}
          thickness={0.7}
          transparent
          opacity={0.44}
        />
      </mesh>
      <mesh position={[0.1, 0.5, 0.7]} scale={1 + contactMix * 0.08}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          emissive="#0891b2"
          emissiveIntensity={0.35}
          roughness={0.16}
          metalness={0.08}
          transmission={0.76}
          thickness={0.55}
          transparent
          opacity={0.48}
        />
      </mesh>
    </group>
  );
}

function NeuralMesh({ heroMix, projectMix }: { heroMix: number; projectMix: number }) {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const geometry = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry();
    const points = [
      -3.8, 2.5, -1.4, -2.4, 1.2, -0.8, -1.2, 2.0, -0.2, 0.1, 1.1, 0.4, 1.8, 2.3, -0.9, 3.6, 1.4, -1.3,
      -3.2, -0.6, -0.2, -1.8, -1.7, 0.5, -0.2, -0.2, 0.8, 1.5, -1.5, 0.2, 3.0, -0.7, -0.7, 0.0, 2.5, 0.2,
      -2.2, 0.8, 1.8, -0.8, 2.2, 1.1, 1.0, 1.7, 1.7, 2.9, 0.7, 1.2, -3.0, -2.0, 1.3, -1.0, -2.8, 1.4,
    ];
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return lineGeometry;
  }, []);

  useFrame((_, delta) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y += delta * 0.03;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.06, 0.02);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, mouse.x * 0.03, 0.02);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.x * 0.4, 0.02);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, mouse.y * 0.25, 0.02);
  });

  return (
    <group ref={group} scale={[1 + heroMix * 0.08, 1 + heroMix * 0.08, 1 + heroMix * 0.08]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#93c5fd" transparent opacity={0.08 + heroMix * 0.12 + projectMix * 0.08} />
      </lineSegments>
      {geometry.attributes.position.array instanceof Float32Array
        ? Array.from({ length: geometry.attributes.position.count }, (_, index) => {
            const x = geometry.attributes.position.array[index * 3];
            const y = geometry.attributes.position.array[index * 3 + 1];
            const z = geometry.attributes.position.array[index * 3 + 2];

            return (
              <mesh key={`${index}-${x}-${y}-${z}`} position={[x, y, z]}>
                <sphereGeometry args={[0.06 + projectMix * 0.015, 12, 12]} />
                <meshBasicMaterial color={index % 3 === 0 ? '#60a5fa' : '#c084fc'} transparent opacity={0.4 + heroMix * 0.25} />
              </mesh>
            );
          })
        : null}
    </group>
  );
}

function PerspectiveGrid({ projectMix, contactMix }: { projectMix: number; contactMix: number }) {
  const grid = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points: number[] = [];

    for (let index = -8; index <= 8; index += 1) {
      points.push(index, -3.8, -4, index, -3.8, 4);
      points.push(-8, -3.8, index, 8, -3.8, index);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, []);

  return (
    <lineSegments geometry={grid} rotation={[-Math.PI / 2.08, 0, 0]} position={[0, -2.4 - contactMix * 0.2, 0]}>
      <lineBasicMaterial color="#334155" transparent opacity={0.12 + projectMix * 0.1 - contactMix * 0.03} />
    </lineSegments>
  );
}

function CursorAura() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((_, delta) => {
    if (!group.current || !core.current || !ring.current || !halo.current) {
      return;
    }

    const targetX = mouse.x * 3.2;
    const targetY = mouse.y * 2.1;
    const targetZ = 1.1 + mouse.y * 0.15;

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.08);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.08);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.08);

    group.current.rotation.y += delta * 0.25;
    core.current.rotation.x += delta * 0.3;
    ring.current.rotation.z += delta * 0.5;
    halo.current.scale.setScalar(1 + Math.sin(performance.now() * 0.0025) * 0.06);
  });

  return (
    <group ref={group}>
      <mesh ref={halo}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.08} />
      </mesh>
      <mesh ref={core}>
        <sphereGeometry args={[0.16, 28, 28]} />
        <meshPhysicalMaterial
          color="#dbeafe"
          emissive="#60a5fa"
          emissiveIntensity={0.75}
          roughness={0.08}
          metalness={0.08}
          transmission={0.9}
          thickness={0.5}
          transparent
          opacity={0.92}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.02, 12, 48]} />
        <meshBasicMaterial color="#c084fc" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

export function ThreeBackground() {
  const { heroMix, projectMix, contactMix } = useScrollIntensity();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-85">
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 20%, rgba(96,165,250,0.16), transparent 28%), radial-gradient(circle at 70% 75%, rgba(139,92,246,0.12), transparent 26%)',
          opacity: 0.9 - contactMix * 0.2,
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={["#0f172a", 9, 28]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-6, -3, 4]} intensity={0.9} color="#60a5fa" />
        <pointLight position={[4, 2, 3]} intensity={0.75 + projectMix * 0.2} color="#c084fc" />
        <PerspectiveGrid projectMix={projectMix} contactMix={contactMix} />
        <NeuralMesh heroMix={heroMix} projectMix={projectMix} />
        <FloatingSpheres contactMix={contactMix} />
        <CursorAura />
        <FloatingPoints density={1.2 + projectMix * 0.9} tint="#7dd3fc" radiusOffset={-0.2 + projectMix * 0.7} />
        <FloatingPoints density={0.75 + projectMix * 0.7} tint="#c084fc" radiusOffset={1.2 + projectMix * 0.8} />
        <FloatingPoints density={0.5 + contactMix * 0.4} tint="#38bdf8" radiusOffset={2.6} />
      </Canvas>
    </div>
  );
}
