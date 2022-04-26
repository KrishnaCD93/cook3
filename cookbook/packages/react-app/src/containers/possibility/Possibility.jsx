import { Box, Heading, HStack, ListItem, Spacer, Text, UnorderedList, VStack } from '@chakra-ui/react';
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
          <HStack>
            <Box shadow='md' alignContent={'center'}>
              {recipe.steps.map((step, index) => (
                <Box key={index} as='flex'>
                  <Heading as='h3' textAlign='center'>Step {index+1}</Heading>
                  <Text>{step}</Text>
                  <Spacer />
                </Box>
                ))}
            </Box>
            <Spacer />
            <Box shadow='md' alignContent={'center'}>
              {recipe.myMeta.map((meta, index) => (
                <Box key={index} as='flex'>
                  <Heading as='h3' textAlign='center'>My Meta @ Step {index+1}</Heading>
                  <Text>{meta}</Text>
                </Box>
                ))}
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
    </>
  )
}

export default Possibility;