import React from 'react';
import { useSphere } from '@react-three/rapier';

function Ornament({ position, color }) {
  const [ref] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.2],
  }));

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function Decorations() {
  return (
    <>
      <Ornament position={[-2, 2, -2]} color="#c0392b" />
      <Ornament position={[2, 1, -2]} color="#27ae60" />
      <Ornament position={[1.5, -2, -1.5]} color="#f1c40f" />
    </>
  );
}

export default Decorations;
