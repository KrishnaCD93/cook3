import { Box, Divider, Heading, HStack, ListItem, Spacer, Text, UnorderedList, VStack } from '@chakra-ui/react';
import React from 'react';

const Possibility = (props) => {
  // Show recipe card
  let recipe = props.recipe;

  return(
    <>
    <Box alignContent={'center'} shadow='md'>
      <Heading as='h2' size='lg' textAlign='center'>
        {recipe.name}
      </Heading>
      <Divider />
      <Box as='flex' margin='30px' shadow='md' alignContent={'center'}>
        <VStack>
          {recipe.ingredients.map((ingredient, index) => (
            <UnorderedList key={index}>
              <ListItem>
                {Object.keys(ingredient).map((key, index) => (
                  <Text key={index}>
                    {key}: {ingredient[key]}
                  </Text>
                ))}
              </ListItem>
            </UnorderedList>
            ))}
          <Spacer />
          <ShowStep steps={recipe.steps} myMeta={recipe.myMeta} />
        </VStack>
      </Box>
    </Box>
    </>
  )
}

function ShowStep(props){
  // Map the steps and my meta to cards in a grid
  let steps = props.steps;
  let myMeta = props.myMeta;

  return(
    <>
    <Box as='grid' gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))' gridGap='20px'>
      <Text fontSize={'2xl'}>Steps</Text>
      {steps.map((step, index) => (
        <Box key={index} as='gridItem'>
          <Text>{step}</Text>
        </Box>
        ))}
      <Box as='gridItem'>
        <Text fontSize={'2xl'}>My Meta</Text>
        {myMeta.map((meta, index) => (
          <Box key={index} as='gridItem'>
            <Text>{meta}</Text>
          </Box>
          ))}
        </Box>
    </Box>
    </>
  )
}

export default Possibility;