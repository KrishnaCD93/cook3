import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Container } from '@chakra-ui/react';
import { useSpring, a } from 'react-spring';
import { Possibility, RecipeFeatures } from "../../containers";

const Recipes = () => {
  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState({name: '', desc: '', ingredients: [], steps: [], myMeta: []});
  
  const dropDown = useSpring({
    opacity: showRecipe ? 1 : 0,
    marginTop: showRecipe ? 0 : -500
  })
  const recipeRef = useRef(null);
  const scrollToRecipe = () => {
    if (!recipeRef.current) return;
    recipeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return ( 
  <>
  <Container w='100%' h='calc(100vh - 70px)' p={2}>
    <Suspense fallback={null}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 110 }}>
        <RecipeFeatures scrollToRecipe={scrollToRecipe} setRecipe={setRecipe} setShowRecipe={setShowRecipe} />
      </Canvas>
    </Suspense>
  </Container>
  {showRecipe && <a.div style={dropDown} ref={recipeRef}>
    <Possibility recipe={recipe} />
  </a.div>}
  </> 
  );
}

export default Recipes;