import React from 'react';
import { Canvas } from "@react-three/fiber"

import { Feature } from '../../components';

const Features = () => {
  return(
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Feature position={[-1.2, 0, 0]} />
      <Feature position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export default Features;