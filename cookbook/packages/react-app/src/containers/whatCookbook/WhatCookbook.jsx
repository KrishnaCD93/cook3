import { Box, Container, Divider, Flex, Heading, HStack, Spacer, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

const WhatCookbook = () => {
  return(
    <Container centerContent bg='brand.200' boxShadow={'inner'}>
      <Box margin={'30px'} boxShadow='dark-lg' bg='brand.100'>
        <Flex alignItems='baseline' margin='30px'>
          <VStack spacing={4}>
          <HStack>
            <Flex align={'center'}>
            <Heading as='h6' color={'brand.400'} align='center'>Why Cookbook?</Heading>
            <Spacer />
            <Text color={'brand.800'} fontSize='md' align={'center'}>
              We are growing a social network of home chefs who want to share their recipe collections 
              with the community. We are building a platform where users can compose recipes together and
              create meals that they can share with their friends. 
            </Text>
            </Flex>
          </HStack>
        <Spacer />
          <Box align={'center'}>
            <Text
              bgGradient='linear(to-t, brand.600 25%, brand.300 50%, brand.600 75%)'
              bgClip='text'
              fontSize='5xl'>
              Built on the principles of ownership and composability to deliver decentralized taste
              </Text>
          </Box>
        <Spacer />
        <SimpleGrid columns={{sm: 1, md: 3}}>
          <Box>
            <VStack spacing={4}>
              <Heading as='h6' color='brand.400'>Create</Heading>
              <Divider />
              <Text color='brand.800' fontSize='md' align={'center'}>
                Use our visual builder to create complex recipes. Map out the ingredients, methods, and tools used.
                Simplify complexity and capture nuance.
              </Text>
            </VStack>
          </Box>
          <br />
          <Box>
            <VStack spacing={4}>
              <Heading as='h6' color='brand.400'>Discover</Heading>
              <Divider />
              <Text color='brand.800' fontSize='md' align={'center'}>
                Discover new recipes. Add them to your collection. Tell the world how you compose your meals.
              </Text>
            </VStack>
          </Box>
          <br />
          <Box>
            <VStack spacing={4}>
              <Heading as='h6' color='brand.400'>Monetize</Heading>
              <Divider />
              <Text color='brand.800' fontSize='md' align={'center'}>
                Share your recipes with your friends and the community. Token gate access and interactions.
                Create appreciation tokens and reward users who interact with your cookbooks.
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