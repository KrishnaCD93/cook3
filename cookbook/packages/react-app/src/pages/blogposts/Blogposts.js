import React, { useEffect, useState } from 'react';
import { Blog } from '../../containers';
import Arweave from 'arweave';

// initialize a gateway connection
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const Blogposts = () => {
  const [posts, setPosts] = useState([]);
  const transactionId = 'l-PpQgwbZb4ihP6C4fSHBKcOf3fsMcQTa6fEkSPNGms';
  async function readFromArweave() {
    arweave.transactions.getData(transactionId, {
      decode: true, string: true
    }).then(data => {
      setPosts(data);
      // console.log(data);
    })
  }

  useEffect(() => {
    readFromArweave()
  }, [transactionId])

  return (
    <Blog post={posts} />
  )
}

export default Blogposts