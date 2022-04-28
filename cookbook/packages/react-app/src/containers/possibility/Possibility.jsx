import { Box, Flex, Grid, GridItem, Heading, Icon, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react'
import React from 'react';
import icon from '../../assets/Logomark - White.svg';

const Possibility = (props) => {
  // Show recipe card
  let recipe = props.recipe;

  return(
    <>
    <Box alignContent={'center'} shadow='md' ref={props.scrollToRecipe}
      border='1px' borderColor={'gray.200'} margin='30px'>
      <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4}>
        <Box shadow='md'>
          <Heading as='h2' size='lg' textAlign='center'>
            {recipe.name}
          </Heading>
          <Text fontSize={'xl'} align='center'>{recipe.desc}</Text>
        </Box>
        <Spacer />
        <ShowIngredients ingredients={recipe.ingredients} />
        <ShowSteps steps={recipe.steps} myMeta={recipe.myMeta} />
      </VStack>
    </Box>
    </>
  )
}

function ShowIngredients(props){
  // Map each object in the ingredients array to arrays of ingredients and quantities
  let ingredients = props.ingredients;
  let ingredientList = [];
  let ingredientValues = [];
  
  for(let i = 0; i < ingredients.length; i++){
    ingredientList.push(Object.keys(ingredients[i]));
    ingredientValues.push(Object.values(ingredients[i]));
  }

  return(
    <>
    <Text as='u' align='center' fontSize={'2xl'}>Ingredients</Text>
    <Flex justifyContent='center' alignItems='center' wrap={'wrap'}>
      {ingredientList.map((ingredient, index) => (
        <>
        <Box key={index} p={'20px'}>
          <Popover>
            <PopoverTrigger>
              <Text as='button' align='center' fontSize={'xl'}>{ingredient}</Text>
            </PopoverTrigger>
            <ShowValues ingredient={ingredient} ingredientValues={ingredientValues} index={index} />
          </Popover>
          <Spacer />
        </Box>
        </>
      ))}
    </Flex>
    </>
  )
}

function ShowValues(props){
  // Show the quantity each ingredient
  let values = props.ingredientValues[props.index];
  return(
    <>
    <PopoverContent bg='brand.100'>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>{props.ingredient}</PopoverHeader>
      <PopoverBody>Quantity: {values}</PopoverBody>
    </PopoverContent>
    </>
  )
}

function ShowSteps(props){
  // Map the steps and my meta to cards in a grid
  let steps = props.steps;
  let myMeta = props.myMeta;

  return(
    <>
    <Text as='u' align='center' fontSize={'2xl'}>Steps</Text>
    <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap='20px'>
      {steps.map((step, index) => (
        <GridItem key={index}>
          <Text align='center' fontSize={'xl'}>{step}</Text><br />
          {myMeta[index] && <><Icon viewBox='0 0 100 116'>{icon}</Icon>
          <Text as='span' align='center' fontSize={'md'}>{myMeta[index]}</Text></>}
        </GridItem>
      ))}
    </Grid>
    </>
  )
}

export default Possibility;