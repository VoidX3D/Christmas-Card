import React, { useRef, useEffect } from 'react';
import { useCylinder, useRapier } from '@react-three/rapier';
import { Torus } from '@react-three/drei';

function Ribbon({ isFalling, onOpen }) {
  const { world } = useRapier();
  const ribbonRef = useCylinder(() => ({
    mass: 1,
    args: [0.1, 0.1, 4.6], // height, radiusTop, radiusBottom
    position: [0, 0, -0.9],
    type: 'kinematicPosition',
    rotation: [0, 0, Math.PI / 2],
  }));

  const bowRef = useRef();

  useEffect(() => {
    if (isFalling && bowRef.current) {
      // For simplicity, we will just make the ribbon and bow disappear with an animation
      // rather than using complex physics for them, to ensure a smooth effect.
      // You can replace this with more complex physics if desired.
      onOpen(); // Trigger the open event
    }
  }, [isFalling, onOpen]);

  return (
    <group>
      {/* Main ribbon band */}
      <mesh ref={ribbonRef.current} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 4.6, 32]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      {/* Bow on top */}
      <Torus
        ref={bowRef}
        args={[0.3, 0.1, 16, 100]}
        position={[0, 0.5, -0.8]}
        onClick={onOpen}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <meshStandardMaterial color="#e74c3c" metalness={0.5} roughness={0.3} />
      </Torus>
    </group>
  );
}

export default Ribbon;