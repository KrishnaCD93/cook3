import React, { useRef } from 'react';
import { WhatCookbook, Header } from "../../containers";
import { Blogposts, CreateRecipe } from '../../pages';
import { Body, CTA } from "../../components";
import { Heading } from '@chakra-ui/react';


const Home = () => {
  const learnMoreRef = useRef(null);
  const learnMoreScroll = () => learnMoreRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <Body>
      <Header learnMoreScroll={learnMoreScroll} />
      <WhatCookbook learnMoreRef={learnMoreRef} />
      <Heading color={'brand.100'} p={2} m={2}>Try it out</Heading>
      <CreateRecipe />
      <CTA />
      <Blogposts />
    </Body>
  );
}

export default Home;