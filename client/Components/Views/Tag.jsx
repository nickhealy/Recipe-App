import React from 'react'

const Tag = ({ name, toggleTag, status }) => {

  return (
    <button class={`tag ${status ? 'tagged' : 'not-tagged'}`} id={name} onClick={(e) => toggleTag(e, name)}>{name}</button>
  )
}

export default Tag; 