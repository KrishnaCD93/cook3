import { Container, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { Article } from '../../components';

const Blog = (props) => {
  let blogPost = props.post;

  return(
    <Container h={'90vh'} w='90vh' m='20px' p='20px'>
      <Heading>Cookbook: A Social Recipe Network</Heading>
      <Flex m='20px' p='20px'>
        <Article post={blogPost} />
      </Flex>
    </Container>
  )
}

export default Blog;