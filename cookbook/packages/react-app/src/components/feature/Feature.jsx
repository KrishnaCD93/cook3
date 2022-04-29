
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'

const Feature = ({recipe, setShowRecipe, setRecipe, position, scrollToRecipe }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

  let metaSkillCount
  recipe.myMeta.forEach((meta) => {
    if (meta) {
      metaSkillCount++
    }})
  let recipeImage = featureImage(recipe.name, metaSkillCount)

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
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={e => handleClick(e)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={hovered ? 'hotpink' : 'orange'} attach='material'>
        {/* <FeatureImage3D recipe={recipe} attach='map' url={recipeImage} /> */}
      </meshBasicMaterial>
    </mesh>
    </>
  )
}

// Create react three drei image component with the recipe image
const FeatureImage3D = (props) => {
  // Set up the image
  const ref = useRef()

  useFrame(() => {
    ref.current.material.zoom = 1
    ref.current.greayscale = 0
    ref.current.material.color.set(0xff0000)
  })
  return <Image ref={ref} {...props} />
}

// Draw an svg with the recipe name as the text
function featureImage({ name, metaSkillCount }) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'>
      <style>
        {`.base { fill: white; font-family:serif; font-size:14px; }`}
        {`.skill { fill: white; font-family:serif; font-size:7px; }`}
      </style>
      <rect width={'100%'} height='100%' fill='black' />
      <text x='50%' y='50%' className='base' text-anchor='middle' dominant-baseline='middle'>{name}</text>
      <text x='50%' y='75%' className='skill' text-anchor='middle' dominant-baseline='middle'>Meta Skills: {metaSkillCount}</text>
    </svg>
  )
}

export default Feature;