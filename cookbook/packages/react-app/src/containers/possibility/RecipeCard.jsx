import { Box, Container, Flex, Grid, GridItem, Heading, Image, Spacer, StackDivider, Tag, Text, VStack } from '@chakra-ui/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton} from '@chakra-ui/react'
import React from 'react';
import icon from '../../assets/Logomark - White.svg';

/* Display recipe with name, image, metaQualityTags, description,
** ingredients.name, ingredients.quantity, ingredients.ingredientMeta, ingredients.ingredientImage,
** steps.action, steps.actionImage, steps.trigger, steps.triggerImage, and steps.stepMeta */
const RecipeCard = (props) => {
  const recipe = props.recipe;
  let recipeName = recipe.name
  let recipeImage = recipe.image
  let recipeMetaQualityTags = recipe.metaQualityTags
  let recipeDescription = recipe.description

  return(
    <>
    <Container centerContent bg='brand.200' boxShadow={'inner'}>
      <Box margin={'30px'} boxShadow='dark-lg' bg='brand.100'>
        <VStack divider={<StackDivider borderColor='brand.200' />} spacing={4} color={'brand.400'} margin='25px'>
          <Box>
            <Heading as='h2' size='lg' textAlign='center'>{recipeName}</Heading>
            {recipeMetaQualityTags && recipeMetaQualityTags.map((meta, index) => (
              <Tag key={index} size='sm' variantColor='brand'>{meta}</Tag>
            ))}
          </Box>
          <Box>
            {recipeImage && <Image src={recipeImage} boxSize={'200px'} />}
            {recipeDescription && <Text fontSize={'xl'} align='center'>{recipeDescription}</Text>}
          </Box>
          <Spacer />
          <ShowIngredients ingredients={recipe.ingredients} />
          <ShowSteps steps={recipe.steps} />
        </VStack>
      </Box>
    </Container>
    </>
  )
}

function ShowIngredients(props){
  const ingredients = props.ingredients;

  // Show the quantity, meta, and image of each ingredient
  function ShowValues(props){
    let name = props.ingredient.name;
    let quantity = props.ingredient.quantity;
    let meta = props.ingredient.meta;
    let image = props.ingredient.image;
  
    return(
      <>
      <PopoverContent bg='brand.600'>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader color={'brand.400'}>{name}</PopoverHeader>
        <PopoverBody>
          <Text color={'brand.800'} align='center' fontSize={'xl'}>Quantity: {quantity}</Text>
          <Spacer />
          {meta && <Text color={'brand.800'} align='center' fontSize={'xl'}>Meta: {meta}</Text>}
          <Spacer />
          {image && <Image src={image} boxSize={'200px'} />}
        </PopoverBody>
      </PopoverContent>
      </>
    )
  }

  return(
    <>
    <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Ingredients</Text>
    <Flex justifyContent='center' alignItems='center' wrap={'wrap'}>
      {ingredients.map((ingredient, index) => (
        <>
        <Box key={index} m='5px' p={'5px'} boxShadow={'md'}>
          <Popover>
            <PopoverTrigger>
              <Text color={'brand.800'} as='button' align='center' fontSize={'xl'}>{ingredient.name}</Text>
            </PopoverTrigger>
            <ShowValues ingredient={ingredient} index={index} />
          </Popover>
          <Spacer />
        </Box>
        </>
      ))}
    </Flex>
    </>
  )
}


function ShowSteps(props){
  // Map the steps and my meta to cards in a grid
  const steps = props.steps;

  return(
    <>
    <Text color={'brand.400'} as='u' align='center' fontSize={'2xl'}>Steps</Text>
    <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap='20px'>
      {steps.map((step, index) => (
        <GridItem key={index} boxShadow='md' bg='brand.500' justifyContent={'center'} alignItems={'center'} m='5px' p={'5px'}>
          <Text color={'brand.800'} align='center' fontSize={'xl'}>{step.action}</Text>
          {step.actionImage && <Image src={step.actionImage} boxSize={'200px'} />}
          <Spacer />
          <Text color={'brand.800'} align='center' fontSize={'xl'}>{step.trigger}</Text>
          {step.triggerImage && <Image src={step.triggerImage} boxSize={'200px'} />}
          <Spacer />
          {step.stepMeta && <Flex bg='brand.400' boxShadow={'sm'} spacing={4} alignItems='center' justifyContent='center'>
            <VStack spacing={0}>
              <Text color={'brand.800'} align='center' fontSize={'xs'}>Step</Text>
              <Image src={icon} boxSize={'50px'} />
              <Text color={'brand.800'} align='center' fontSize={'xs'}>Meta</Text>
            </VStack>
            <Text color={'brand.800'} as='span' align='center' fontSize={'md'}>{step.stepMeta}</Text>
          </Flex>}
        </GridItem>
      ))}
    </Grid>
    </>
  )
}

export default RecipeCard;