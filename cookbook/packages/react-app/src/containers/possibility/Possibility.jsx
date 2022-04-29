import { Box, Container, Flex, Grid, GridItem, Heading, Image, Spacer, StackDivider, Text, VStack } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react'
import React from 'react';
import icon from '../../assets/Logomark - White.svg';

const Possibility = (props) => {
  // Show recipe card
  let recipe = props.recipe;

  return(
    <>
    <Container centerContent bg='brand.200' boxShadow={'inner'}>
      <Box margin={'30px'} boxShadow='dark-lg' bg='brand.100'>
        <VStack divider={<StackDivider borderColor='brand.200' />} spacing={4} color={'brand.400'} margin='25px'>
          <Box>
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
    </Container>
    </>
  )
}

function ShowIngredients(props){
  // Map each object in the ingredients array to arrays of ingredients and quantities
  let ingredients = props.ingredients;
  let ingredientList = [];
  let ingredientValues = [];
  
  ingredients.forEach((ingredient) => {
    ingredientList.push(Object.keys(ingredient));
    ingredientValues.push(Object.values(ingredient));
  });

  return(
    <>
    <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Ingredients</Text>
    <Flex justifyContent='center' alignItems='center' wrap={'wrap'}>
      {ingredientList.map((ingredient, index) => (
        <>
        <Box key={index} m='5px' p={'5px'} boxShadow={'md'}>
          <Popover>
            <PopoverTrigger>
              <Text color={'brand.800'} as='button' align='center' fontSize={'xl'}>{ingredient}</Text>
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
    <PopoverContent bg='brand.600'>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader color={'brand.400'}>{props.ingredient}</PopoverHeader>
      <PopoverBody>
        <Text color={'brand.800'} align='center' fontSize={'xl'}>Quantity: {values}</Text>
        </PopoverBody>
    </PopoverContent>
    </>
  )
}

function ShowSteps(props){
  // Map the steps and my meta to cards in a grid
  let steps = props.steps;
  let stepsAction = [];
  let stepsTrigger = [];
  let myMeta = props.myMeta;

  steps.forEach((step) => {
    stepsAction.push(Object.keys(step));
    stepsTrigger.push(Object.values(step));
  });

  return(
    <>
    <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Steps</Text>
    <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap='20px'>
      {steps.map((step, index) => (
        <GridItem key={index} boxShadow='md' bg='brand.500' justifyContent={'center'} alignItems={'center'} m='5px' p={'5px'}>
        <Text color={'brand.800'} align='center' fontSize={'xl'}>{stepsAction[index]}</Text>
          <Spacer />
          <Text color={'brand.800'} align='center' fontSize={'xl'}>{stepsTrigger[index]}</Text>
          <Spacer />
          {myMeta[index] && <><Flex bg='brand.400' boxShadow={'sm'} spacing={4} alignItems='center' justifyContent='center'>
            <VStack spacing={0}>
              <Text color={'brand.800'} align='center' fontSize={'xs'}>My</Text>
              <Image src={icon} boxSize={'50px'} />
              <Text color={'brand.800'} align='center' fontSize={'xs'}>Meta</Text>
            </VStack>
            <Text color={'brand.800'} as='span' align='center' fontSize={'md'}>{myMeta[index]}</Text>
          </Flex></>}
        </GridItem>
      ))}
    </Grid>
    </>
  )
}

export default Possibility;