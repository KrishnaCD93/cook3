import React from 'react';

const Feature = () => {
  return(
      <mesh>
        <bufferGeometry 
          attach="geometry"
          args={[1, 1, 1]}
        />
      </mesh>
  )
}

export default Feature;