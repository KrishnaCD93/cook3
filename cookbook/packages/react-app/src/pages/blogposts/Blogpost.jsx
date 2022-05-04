import { Container, Heading } from "@chakra-ui/react";
import { Article } from "../../components";
import { useParams } from "react-router-dom";
import { getBlog } from "./Blogposts";
import { useEffect, useState } from "react";

export default function Blogpost() {
  const [post, setPost] = useState(null);
  let params = useParams();
  useEffect(() => {
    let post = getBlog(params.digest);
    if (post) {
      setPost(post);
    }
  }, [params.digest]);
  return (
    <>{post &&
      <Container centerContent>
        <Heading>{post.content.title}</Heading>
        <Article post={post.content.body} />
      </Container>
    }
    </>)
}