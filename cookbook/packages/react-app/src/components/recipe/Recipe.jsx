
import React, { useRef, useState } from 'react'
import { RoundedBox, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'

const Recipe = ({ args, recipe, setShowRecipe, setRecipe, position, scrollToRecipe }) => {
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

  const numIngredients = recipe.ingredients.length
  const numSteps = recipe.steps.length
  const numMeta = recipe.myMeta.length

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
      onPointerOut={(event) => setHover(false)} />
    <Text position={[position[0], position[1] + 6, position[2] + 1]}
      lineHeight={0.4} scale={hovered ? 1.25 : 1}
      fontSize={width / 20}>{recipe.name}</Text>
    <Text position={[position[0], position[1] + 1, position[2] + 1]}
      lineHeight={0.4} scale={hovered ? 1.25 : 1}
      fontSize={width / 30}>{numIngredients} ingredients</Text>
    <Text position={[position[0], position[1] - 3, position[2] + 1]}
      lineHeight={0.4} scale={hovered ? 1.25 : 1}
      fontSize={width / 30}>{numSteps} steps</Text>
    <Text position={[position[0], position[1] - 7, position[2] + 1]}
      lineHeight={0.4} scale={hovered ? 1.25 : 1}
      fontSize={width / 30}>{numMeta} meta skills</Text>
    </>
  )
}

export default Recipe;