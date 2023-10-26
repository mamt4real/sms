import React from 'react'

function MyImg({ src, alt, ...others }) {
  return <img src={`http://localhost:5000/${src}`} alt={alt} {...others} />
}

export default MyImg
