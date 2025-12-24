import React, { useRef, useEffect } from 'react';
import { useBox, useRapier } from '@react-three/rapier';

function Ribbon({ isFalling, onOpen }) {
  const { world } = useRapier();
  const ribbonRef = useBox(() => ({
    mass: 1,
    args: [4.6, 0.2, 0.2],
    position: [0, 0, -0.9],
    type: 'kinematicPosition',
  }));

  const bowRef = useBox(() => ({
    mass: 0.2,
    args: [0.5, 0.5, 0.5],
    position: [0, 0.5, -0.8],
    type: 'kinematicPosition',
  }));

  useEffect(() => {
    if (isFalling) {
      // Make ribbon dynamic and apply impulse
      ribbonRef.current.setBodyType(0); // 0 for dynamic
      ribbonRef.current.applyImpulse({ x: 0.1, y: -2, z: 2 }, true);
      ribbonRef.current.applyTorqueImpulse({ x: 0.5, y: 0, z: 0 }, true);

      // Make bow dynamic and apply impulse
      bowRef.current.setBodyType(0);
      bowRef.current.applyImpulse({ x: -0.1, y: -1, z: 1.5 }, true);
    }
  }, [isFalling]);

  return (
    <>
      {/* Main ribbon band */}
      <mesh ref={ribbonRef.current} castShadow>
        <boxGeometry args={[4.6, 0.2, 0.2]} />
        <meshStandardMaterial color="#27ae60" />
      </mesh>
      {/* Bow on top */}
      <mesh
        ref={bowRef.current}
        castShadow
        onClick={onOpen}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
    </>
  );
}

export default Ribbon;
