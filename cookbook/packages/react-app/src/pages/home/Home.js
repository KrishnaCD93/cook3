import React, { useRef, useState } from 'react';
import { Footer, Blog, Possibility, Features, WhatCookbook, Header } from "../../containers";
import { CTA } from "../../components";
import { a, useSpring } from 'react-spring';
import { Canvas } from "@react-three/fiber";


const Home = () => {
  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState({name: '', desc: '', ingredients: [], steps: [], myMeta: []});
  
  const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
  const dropDown = useSpring({
    opacity: showRecipe ? 1 : 0,
    marginTop: showRecipe ? 0 : -500
  })
  
  const learnMoreRef = useRef(null);
  const learnMoreScroll = () => learnMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const recipeRef = useRef(null);
  const scrollToRecipe = () => {
    if (!recipeRef.current) return;
    recipeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
    <a.div style={fadeIn}>
    <Header learnMoreScroll={learnMoreScroll} />
    </a.div>
    <WhatCookbook learnMoreRef={learnMoreRef} />
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
      <color attach="background" args={['black']} />
      <ambientLight />
      <Features setShowRecipe={setShowRecipe} setRecipe={setRecipe} scrollToRecipe={scrollToRecipe} />
    </Canvas>
    {showRecipe && <a.div style={dropDown} ref={recipeRef}>
      <Possibility recipe={recipe} />
    </a.div>}
    <CTA />
    <Blog />
    <Footer />
    </>
  );
}

export default Home;