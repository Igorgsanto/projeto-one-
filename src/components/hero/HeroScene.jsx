import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

function Particles({ count }) {
  const ref = useRef(null);
  const positions = useMemo(() => {
    // Deterministic pseudo-random positions avoid layout shifts between renders.
    let seed = 41;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      values[i * 3] = (random() - 0.5) * 14;
      values[i * 3 + 1] = (random() - 0.5) * 9;
      values[i * 3 + 2] = (random() - 0.5) * 7 - 1;
    }
    return values;
  }, [count]);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.012;
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, state.pointer.y * 0.08, 2, delta);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#b9a8ff" size={0.018} transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Sculpture({ scrollProgress, mobile }) {
  const group = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);

  useFrame((state, delta) => {
    const scroll = scrollProgress.current;
    const targetX = mobile ? 0 : 1.35;
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX + state.pointer.x * 0.22, 3, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, 0.2 + state.pointer.y * 0.15 + scroll * 1.4, 3, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.5 - state.pointer.y * 0.35 + scroll * 0.8, 3, delta);
    group.current.rotation.y += delta * 0.13;
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -0.25 + state.pointer.x * 0.18, 3, delta);
    const scale = 1 - scroll * 0.28;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, scale, 3, delta));
    ringA.current.rotation.z += delta * 0.08;
    ringB.current.rotation.x += delta * 0.06;
  });

  return (
    <group ref={group} rotation={[0.5, 0, -0.25]} scale={mobile ? 0.82 : 1}>
      <mesh castShadow>
        <torusKnotGeometry args={[1.12, 0.34, mobile ? 150 : 240, mobile ? 24 : 40, 2, 3]} />
        <meshPhysicalMaterial color="#7352e8" metalness={0.82} roughness={0.2} clearcoat={1} clearcoatRoughness={0.16} emissive="#160a3e" emissiveIntensity={0.35} />
      </mesh>
      <mesh ref={ringA} rotation={[1.25, 0.2, 0.4]}>
        <torusGeometry args={[2.05, 0.008, 6, 180]} />
        <meshBasicMaterial color="#ab96ff" transparent opacity={0.48} />
      </mesh>
      <mesh ref={ringB} rotation={[0.25, 1.1, -0.3]}>
        <torusGeometry args={[1.75, 0.005, 6, 160]} />
        <meshBasicMaterial color="#f5f5f0" transparent opacity={0.22} />
      </mesh>
      <mesh position={[1.5, 1.22, 0.6]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#d9ceff" />
      </mesh>
    </group>
  );
}

export default function HeroScene({ scrollProgress, mobile }) {
  const container = useRef(null);
  const inView = useInView(container, { margin: '120px' });

  return (
    <div className="hero-scene" ref={container} aria-hidden="true">
      <Canvas
        dpr={mobile ? [1, 1.15] : [1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        frameloop={inView ? 'always' : 'never'}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 4, 5]} color="#e7e0ff" intensity={3.2} />
        <pointLight position={[-3, -2, 3]} color="#5d35ff" intensity={38} distance={10} />
        <pointLight position={[3, 0, -2]} color="#ff8f78" intensity={16} distance={8} />
        <Sculpture scrollProgress={scrollProgress} mobile={mobile} />
        <Particles count={mobile ? 150 : 420} />
      </Canvas>
    </div>
  );
}
