import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

const Article = (props) => {
  return(
    <>{props.post && <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {props.post}
    </ReactMarkdown>}</>
  ) 
}

export default Article;