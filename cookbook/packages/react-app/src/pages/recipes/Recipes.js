import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { useSpring, a } from 'react-spring';
import { RecipeCard, RecipeFeatures } from "../../containers";
import useFleekStorage from '../../hooks/useFleekStorage';
import { useAccount } from 'wagmi';

const Recipes = () => {
  const [showRecipe, setShowRecipe] = useState(false);
  const [cookbooks, setCookbooks] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState(null);

  const { data: account } = useAccount();
  const [listFiles, fleekStorageGet, fleekStorageGetByHash] = useFleekStorage();

  useEffect(() => {
    const fetchData = async () => {
      let cookbooks = await listFiles();
      setCookbooks(cookbooks);
    }
    fetchData();
    console.log(cookbooks);
  }, []);

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
  <div style={{height: 'calc(100vh - 70px)'}}>
    <Suspense fallback={null}>
      <Canvas orthographic camera={{ zoom: 80 }} gl={{ alpha: false, antialias: false, stencil: false }} dpr={[1, 1.5]}>
        <RecipeFeatures scrollToRecipe={scrollToRecipe} setRecipe={setRecipe} setShowRecipe={setShowRecipe} recipes={recipes} />
      </Canvas>
    </Suspense>
  </div>
  {showRecipe && <a.div style={dropDown} ref={recipeRef}>
    <RecipeCard recipe={recipe} />
  </a.div>}
  </> 
  );
}

export default Recipes;