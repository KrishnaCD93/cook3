import { Box, Container, Divider, Flex, HStack, Spacer, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const WhatCookbook = (props) => {
  return(
    <Container centerContent bg='brand.200' boxShadow={'inner'} ref={props.learnMoreRef}>
      <Box margin={'30px'} boxShadow='dark-lg' bg='brand.100'>
        <Flex alignItems='baseline' margin='30px'>
          <VStack spacing={4}>
          <HStack>
            <SimpleGrid columns={{sm: 1, md: 2}}>
              <Box as='flex' justifyContent='center' alignItems='center' margin={'25px'}>
                <Text fontSize={'4xl'} color={'brand.400'} align='center'>Why Cookbook?</Text>
              </Box>
              <Box>
                <Text color={'brand.800'} fontSize='md' align={'center'}>
                  Cookbook is a social network for home chefs who want to share recipes 
                  with their community. We are building a platform where you can create recipes
                  and compose new meal ideas together with your community. This app is for you if 
                  you like to cook variations of your favorite recipes and talk about your experiences.
                </Text>
              </Box>
            </SimpleGrid>
          </HStack>
        <Spacer />
          <Box align={'center'}>
            <Text
              bgGradient='linear(to-tl, brand.400, brand.500, brand.800)'
              bgClip='text'
              textShadow={'0 1px 0 rgba(0, 0, 0, 0.1)'}
              fontSize='5xl'>
              User generated content<br />delivering decentralized taste
              </Text>
          </Box>
        <Spacer />
        <SimpleGrid columns={{sm: 1, md: 3}}>
          <Box>
            <VStack spacing={4}>
              <Text fontSize='4xl' color='brand.400'>Create</Text>
              <Divider />
              <Text color='brand.800' fontSize='md' align={'center'}>
                Use our visual builder to build beautiful recipe collections. Map out the ingredients, methods, and tools used.
                Simplify complexity and capture nuance.
              </Text>
            </VStack>
          </Box>
          <br />
          <Box>
            <VStack spacing={4}>
              <Text fontSize='4xl' color='brand.400'>Discover</Text>
              <Divider />
              <Text color='brand.800' fontSize='md' align={'center'}>
                Discover new recipes and meta skills. 
                Compose new meals and add your unique taste to the marketplace of ideas.
              </Text>
            </VStack>
          </Box>
          <br />
          <Box>
            <VStack spacing={4}>
              <Text fontSize='4xl' color='brand.400'>Trade</Text>
              <Divider />
              <Text color='brand.800' fontSize='md' align={'center'}>
                Trade your ideas and meta skills learned from experiences in the kitchen. 
                Rank up your skills and create new recipes.
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>
        </VStack>
        </Flex>
      </Box>
    </Container>
  )
}

export default WhatCookbook;