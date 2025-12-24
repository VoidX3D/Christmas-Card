import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html, Stars } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Envelope from './components/Envelope';
import Card from './components/Card';
import Ribbon from './components/Ribbon';
import Snowflakes from './components/Snowflakes';
import Decorations from './components/Decorations';

function App() {
  const [isOpened, setOpened] = useState(false);
  const [isRibbonFalling, setRibbonFalling] = useState(false);

  const handleOpen = () => {
    if (!isOpened) {
      setRibbonFalling(true);
      setTimeout(() => setOpened(true), 200); // Open envelope shortly after ribbon falls
    }
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={1} />
      <spotLight
        position={[10, 20, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Suspense fallback={<Html center>Loading...</Html>}>
        <Physics gravity={[0, -30, 0]}>
          <Envelope isOpened={isOpened} />
          <Card isOpened={isOpened} />
          {!isOpened && <Ribbon isFalling={isRibbonFalling} onOpen={handleOpen} />}
          <Snowflakes />
          <Decorations />
        </Physics>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls autoRotate autoRotateSpeed={0.1} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
    </Canvas>
  );
}

export default App;