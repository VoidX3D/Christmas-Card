import React from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Html, useTexture } from '@react-three/drei';

function Card({ isOpened }) {
  const familyPhotoTexture = useTexture('/assets/images/family-photo.jpg');

  const { position, rotation } = useSpring({
    position: isOpened ? [0, 0, 0] : [0, -1, -1.1],
    rotation: isOpened ? [0, 0, 0] : [0.1, 0, 0],
    config: { mass: 2, tension: 280, friction: 60, delay: 500 },
  });

  return (
    <animated.group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[4, 5.5, 0.05]} />
        <meshStandardMaterial color="#f9f9f9" />
      </mesh>
      
      <Html
        transform
        position={[0, 0.03, 0]}
        occlude="blending"
        pointerEvents="none"
        style={{
          width: '380px',
          height: '530px',
          padding: '20px',
          color: '#333',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '10px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <img src="/assets/images/family-photo.jpg" alt="Family" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #c0392b', marginBottom: '1rem' }} />
          <h1 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem', color: '#c0392b' }}>Merry Christmas!</h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', lineHeight: 1.6, flexGrow: 1 }}>
            Hope your day went well!<br />
            Thinking of you all in the Netherlands.<br />
            Wishing you peace, health, and warm moments together.<br />
            May this season bring a little extra joy!<br />
            Miss you and can’t wait to see you again.
          </p>
          <p style={{ fontFamily: "'Roboto', sans-serif", fontSize: '0.9rem', alignSelf: 'flex-end', marginTop: '1rem' }}>— Sincere Bhattarai</p>
        </div>
      </Html>
    </animated.group>
  );
}

export default Card;
