import React from 'react';
import ReactMarkdown from 'react-markdown';

const Article = (props) => {
  const { post } = props;
  // Grab content value from the first key in the post object
  // const content = post[Object.keys(post)[0]];
  // console.log(content);
  return(
    <ReactMarkdown>
      {post.content}
    </ReactMarkdown>
  ) 
}

export default Article;