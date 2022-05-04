import { Box, Container, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import altLogo from '../../assets/Logo - Alternate Layout - Sorrell Brown.png';

const Blog = (props) => {
  let post = props.post;
  let nav = useNavigate();
  const handleClick = () => {
    nav('/blog/' + post.digest)
  }
  return(
    <Container centerContent>
      <Flex as='button' align='center' justify='center' onClick={handleClick}>
        <Box>
          <Image src={altLogo} alt='Cookbook' />
        </Box>
      </Flex>
    </Container>
  )
}

export default Blog;