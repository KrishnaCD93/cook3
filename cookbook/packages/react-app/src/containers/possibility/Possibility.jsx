import { Box, Grid, GridItem, Heading, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Possibility = (props) => {
  // Show recipe card
  let recipe = props.recipe;

  return(
    <>
    <Box alignContent={'center'} shadow='md' ref={props.recipeRef} key={recipe.name} 
      border='1px' borderColor={'gray.200'} margin='30px'>
      <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4}>
        <Box><Heading as='h2' size='lg' textAlign='center'>
          {recipe.name}
        </Heading>
        <Text fontSize={'xl'} align='center'>{recipe.desc}</Text></Box>
        <ShowIngredients ingredients={recipe.ingredients} />
        <Spacer />
        <ShowSteps steps={recipe.steps} myMeta={recipe.myMeta} />
      </VStack>
    </Box>
    </>
  )
}

function ShowSteps(props){
  // Map the steps and my meta to cards in a grid
  let steps = props.steps;
  let myMeta = props.myMeta;

  return(
    <>
    <Text align='center' fontSize={'2xl'}>Steps</Text>
    <Grid gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))' gridGap='20px'>
      {steps.map((step, index) => (
        <GridItem key={index}>
          <Text align='center' fontSize={'xl'}>{step}</Text>
          {myMeta[index] && <Text align='center' fontSize={'md'}>{myMeta[index]}</Text>}
        </GridItem>
      ))}
    </Grid>
    </>
  )
}

function ShowIngredients(props){
  let ingredients = props.ingredients;

  return (
    <>
    <Text align='center' fontSize={'2xl'}>Ingredients</Text>
    <Grid gridTemplateColumns='1fr' gridGap='20px'>
    {ingredients.map((ingredient, index) => (
      <GridItem key={index}>
          {Object.keys(ingredient).map((key, index) => (
            <>
            <Text align='center' fontSize='xl' key={index}>{key}</Text>
            <Text align='center' fontSize='md'>{ingredient[key]}</Text>
            </>
          ))}
      </GridItem>
    ))}
    </Grid>
    </>
  )
}

export default Possibility;