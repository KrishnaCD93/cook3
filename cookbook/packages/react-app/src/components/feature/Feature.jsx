
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image, RoundedBox } from '@react-three/drei'
import imageUrl from '../../assets/Logomark - White.svg'

const Feature = ({args, recipe, setShowRecipe, setRecipe, position, scrollToRecipe, ...props }) => {
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

  // let metaSkillCount = 0;
  // recipe.myMeta.forEach((meta) => {
  //   if (meta) {
  //     metaSkillCount++;
  //   }});
  
  // Set up the image
  // let image = FeatureImage(recipe.name,recipe.desc, metaSkillCount)

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

// Draw an svg with the recipe name as the text
// function FeatureImage({ name, desc, metaSkillCount }) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">
//       <style>
//         {`.base { fill: white; font-family: serif; font-size: 14px; }
//         .skill { fill: white; font-family: serif; font-size: 10px; }`}
//       </style>
//       <rect width="100%" height="100%" fill="black" />
//       <text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">{name}</text>
//       <text x="50%" y="60%" class="base" dominant-baseline="middle" text-anchor="middle">By: Krishna</text>
//       <text x="50%" y="75%" class="skill" dominant-baseline="middle" text-anchor="middle">{metaSkillCount}</text>
//     </svg>
//   )
// }

export default Feature;