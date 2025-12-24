import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const numSnowflakes = 300;

function Snowflakes() {
  const mesh = useRef();
  const snowflakeTexture = useTexture('/assets/snowflake.png'); // Using a simple texture for now

  const [positions, sizes] = useMemo(() => {
    const p = new Float32Array(numSnowflakes * 3);
    const s = new Float32Array(numSnowflakes);
    for (let i = 0; i < numSnowflakes; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = Math.random() * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
      s[i] = Math.random() * 0.15 + 0.05; // Bigger snowflakes
    }
    return [p, s];
  }, []);

  useFrame((state, delta) => {
    if (mesh.current) {
      const positionsArray = mesh.current.geometry.attributes.position.array;
      for (let i = 0; i < numSnowflakes; i++) {
        positionsArray[i * 3 + 1] -= sizes[i] * delta * 2; // Fall speed
        if (positionsArray[i * 3 + 1] < -5) {
          positionsArray[i * 3 + 1] = 10; // Reset to top
        }
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        map={snowflakeTexture}
        size={0.5}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default Snowflakes;
