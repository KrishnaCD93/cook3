
import React, { useRef, useState } from 'react'
import { Image, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import imageUrl from '../../assets/Logomark - Sorrell Brown.png'


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
  })

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
      scale={hovered ? 1.5 : 1}
      onClick={e => handleClick(e)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <Image url={imageUrl} ref={mesh} {...props} />
    </RoundedBox>
    </>
  )
}

export default Feature;