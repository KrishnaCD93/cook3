import { Box, Container, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import altLogo from '../../assets/Logo - Alternate Layout - Sorrell Brown.png';
import { getBlog } from '../../pages/blogposts/Blogposts';

const Blog = () => {
  let post = getBlog('MUAobQ0EprcHVFaxFd55SZwLKLK7n1YpR4aD46xHNr8');
  let nav = useNavigate();
  const handleClick = () => {
    nav('/blog/' + post.digest)
  }
  return(
    <Container m='20px' p='20px' centerContent>
      {post &&
        <Flex as='button' m='20px' p='20px' align='center' justify='center' onClick={handleClick}>
          <Box>
            <Heading>{post.content.title}</Heading>
            <Box as='img' src={altLogo} alt='Cookbook' />
          </Box>
          <Spacer />
          <Text>
            Read on for more information about the project.
          </Text>
        </Flex>
      }
    </Container>
  )
}

export default Blog;