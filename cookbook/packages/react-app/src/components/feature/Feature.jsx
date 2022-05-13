
import React, { useRef, useState } from 'react'
import { Image, RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import imageUrl from '../../assets/Stir Fry/7.jpg'
import { useThree } from '@react-three/fiber'

const Feature = ({args, recipe, setShowRecipe, setRecipe, position, scrollToRecipe, url, ...props }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, set image visual state
  useFrame((state, delta) =>  {
    mesh.current.material.zoom = 1
    mesh.current.material.grayscale = active? 0 : 0.5
    mesh.current.material.color.set('#AD9870')
  })
  const { width } = useThree((state) => state.viewport)

  // Handle click event
  const handleClick = () => {
    setActive(!active)
    setRecipe(recipe)
    setShowRecipe(!active)
    setTimeout(() => {
      scrollToRecipe()
    }, 500)
  }
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <>
    <RoundedBox args={args} radius={0.05} smoothness={4}
      position={position} 
      ref={mesh}
      scale={hovered ? 1.25 : 1}
      onClick={e => handleClick(e)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <Text position={[position[0], position[1] - 0.5, position[2] + 0.5]}
        lineHeight={0.4}
        fontSize={width / 30}
        material-toneMapped={false}
        anchorY="middle" ref={mesh}>{recipe.name}</Text>
      {/* <Image url={imageUrl} {...props} /> */}
    </RoundedBox>
    </>
  )
}

export default Feature;