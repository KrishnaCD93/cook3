import React, { useEffect, useMemo, useState } from 'react';
import Arweave from 'arweave';
import { Box, Container, Flex, SimpleGrid, Heading, Link, Text } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';
import { Blog } from '../../components';

// initialize a gateway connection
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const blogs = [];

const Blogposts = () => {
  const [posts, setPosts] = useState([]);
  const transactionId = useMemo(() => 
  ['l-PpQgwbZb4ihP6C4fSHBKcOf3fsMcQTa6fEkSPNGms']
  , []);
  
  async function readFromArweave(id) {
    if (!id) return;
    arweave.transactions.getData(id, {
      decode: true, string: true
    }).then(data => {
      let blog = JSON.parse(data);
      setPosts(post => [...post, blog]);
    })
  }
  useEffect(() => {
    transactionId.forEach(async (transactionId) => {
      await readFromArweave(transactionId)
    })
  }, [transactionId])

  return (
    <>{posts && <Container centerContent>
      <Heading>Blog Posts</Heading>
      <Text>Read about the product and the vision</Text>
      <Flex>
        <LinkBlogs posts={posts} />
      </Flex>
      <SimpleGrid gap='20px'>
      </SimpleGrid>
      <Flex m='20px' p='20px'>
        <Outlet />
      </Flex>
    </Container>}</>
  )
}

function LinkBlogs(props) {
  props.posts.forEach((post, index) => {
    blogs[index] = post;
  })

  return (
    <>
      {blogs && blogs.map((post, index) => (
        <Box as='button' m='5px' p='5px' key={index}>
        <Link as={NavLink}
          style={({ isActive }) => {
            return {
              color: isActive ? "#c9b68e" : "",
            };
          }}
          to={`/blog/${post.digest}`}
          key={post.digest}
        >
          {post.content.title}
        </Link>
        <Blog post={post} />
        </Box>
      ))}
    </>
  );
}

export function getBlog(digest) {
  return blogs.find((post) => post.digest === digest)
}

export default Blogposts