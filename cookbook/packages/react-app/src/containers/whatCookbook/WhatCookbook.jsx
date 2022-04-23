import { Box, Container, Divider, Flex, HStack, Spacer, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const WhatCookbook = (props) => {
  return(
    <Container centerContent bg='brand.200' boxShadow={'inner'}>
      <Box margin={'30px'} boxShadow='dark-lg' bg='brand.100' ref={props.learnMoreRef}>
        <Flex alignItems='baseline' margin='30px'>
          <VStack spacing={4}>
          <HStack>
            <SimpleGrid columns={{sm: 1, md: 2}}>
              <Box as='flex' justifyContent='center' alignItems='center' margin={'25px'}>
                <Text fontSize={'4xl'} color={'brand.400'} align='center'>Why Cookbook?</Text>
              </Box>
              <Box>
                <Text color={'brand.800'} fontSize='md' align={'center'}>
                  We are growing a social network of home chefs who want to share their recipe ideas 
                  with their community. We are building a platform where users can create recipes together and
                  compose meals that they can share with their friends. 
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
                Use our visual builder to build beautiful recipes. Map out the ingredients, methods, and tools used.
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
                Discover new recipes and add them to your collection. 
                Compose new meals and add variety to the marketplace of ideas.
              </Text>
            </VStack>
          </Box>
          <br />
          <Box>
            <VStack spacing={4}>
              <Text fontSize='4xl' color='brand.400'>Monetize</Text>
              <Divider />
              <Text color='brand.800' fontSize='md' align={'center'}>
                Share your recipes with your friends and the community. Token gate access and interactions.
                Reward your community with appreciation tokens for interacting with your cookbook.
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