import React from 'react';
import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';

const CTA = (props) => {
  // On handle get started, link to Create Recipe page
  const handleGetStarted = () => {
    window.location.href = '/create-recipe';
  }

  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        'url(https://images.unsplash.com/photo-1602539471306-66df545710e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'brand.700'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            Share your favourite cooking experiences and show off your meta skills
          </Text>
          <Stack direction={'row'}>
            <Button onClick={handleGetStarted}
              bg={'brand.600'}
              rounded={'full'}
              color={'brand.400'}
              _hover={{ bg: 'brand.500' }}>
              Get Started
            </Button>
            <Button onClick={props.blogScroll}
              bg={'whiteAlpha.300'}
              rounded={'full'}
              color={'brand.800'}
              _hover={{ bg: 'whiteAlpha.500' }}>
              Show me more
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}

export default CTA;