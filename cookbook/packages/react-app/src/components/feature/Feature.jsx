
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Feature = ({recipe, executeShowRecipe, props}) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Handle click event
  const handleClick = (event) => {
    setActive(!active)
    executeShowRecipe(recipe)
  }
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={e => handleClick(e)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
    </>
  )
}

export default Feature;