import React, { useRef, useState } from 'react';
import { Possibility, WhatCookbook, Header } from "../../containers";
import { Blogposts, CreateRecipe } from '../../pages';
import { Body, CTA } from "../../components";
import { a, useSpring } from 'react-spring';
import { Heading } from '@chakra-ui/react';


const Home = () => {
  const [showRecipe, setShowRecipe] = useState(false);
  const [recipe, setRecipe] = useState({name: '', desc: '', ingredients: [], steps: [], myMeta: []});
  
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
    <Body>
      <a.div>
      <Header learnMoreScroll={learnMoreScroll} />
      </a.div>
      <WhatCookbook learnMoreRef={learnMoreRef} />
      <Heading>Try it out</Heading>
      <CreateRecipe setShowRecipe={setShowRecipe} scrollToRecipe={scrollToRecipe} setRecipe={setRecipe} />
      {showRecipe && <a.div style={dropDown} ref={recipeRef}>
        <Possibility recipe={recipe} />
      </a.div>}
      <CTA />
      <Blogposts />
    </Body>
  );
}

export default Home;