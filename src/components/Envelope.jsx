import React from 'react';
import { useSpring, animated } from '@react-spring/three';

function Envelope({ isOpened }) {
  const { rotation: flapRotation } = useSpring({
    rotation: isOpened ? [-Math.PI, 0, 0] : [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  return (
    <group position={[0, 0, -1]}>
      {/* Envelope Body */}
      <mesh receiveShadow castShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[4.5, 3, 0.1]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
      
      {/* Top Flap */}
      <animated.mesh
        rotation={flapRotation}
        position={[0, 1, 0.05]}
        castShadow
      >
        <planeGeometry args={[4.5, 2]} />
        <meshStandardMaterial color="#b33939" side={2} />
      </animated.mesh>
    </group>
  );
}

export default Envelope;
