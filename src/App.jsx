import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Envelope from './components/Envelope';
import Card from './components/Card';
import Ribbon from './components/Ribbon';
import Snowflakes from './components/Snowflakes';

function App() {
  const [isOpened, setOpened] = useState(false);
  const [isRibbonFalling, setRibbonFalling] = useState(false);

  const handleOpen = () => {
    if (!isOpened) {
      setRibbonFalling(true);
      setTimeout(() => setOpened(true), 500); // Open envelope shortly after ribbon falls
    }
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.7} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Suspense fallback={<Html center>Loading...</Html>}>
        <Physics gravity={[0, -20, 0]}>
          <Envelope isOpened={isOpened} />
          <Card isOpened={isOpened} />
          <Ribbon isFalling={isRibbonFalling} onOpen={handleOpen} />
          <Snowflakes />
        </Physics>
        <Environment preset="night" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
