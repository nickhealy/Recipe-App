import React from 'react'

const Tag = ({ name, toggleTag, status }) => {

  return (
  <button class={`tag ${status ? 'tagged' : ''}`} id={name}>{name} onClick={toggleTag}</button>
  )
}

export default Tag; 