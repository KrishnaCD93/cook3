import React, { useEffect, useMemo, useState } from 'react';
import Arweave from 'arweave';
import { Container, Flex, Link } from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';

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
  ['l-PpQgwbZb4ihP6C4fSHBKcOf3fsMcQTa6fEkSPNGms', 'dNnTBwKmhDw_l-czSC4EYnHQNNBBqvR87TeAKxgwKHY']
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
    <>{posts && <Container>
      <Flex m={'20px'} p={'20px'}>
        <LinkBlogs posts={posts} />
      </Flex>
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
        <Link as={NavLink}
          style={({ isActive }) => {
            return {
              display: "block",
              margin: "1rem 0",
              color: isActive ? "#c9b68e" : "",
            };
          }}
          to={`/blog/${post.digest}`}
          key={index}
        >
          {post.content.title}
        </Link>
      ))}
    </>
  );
}

export function getBlog(digest) {
  return blogs.find((post) => post.digest === digest)
}

export default Blogposts