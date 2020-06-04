import React from 'react'

const Tag = ({ name, toggleTag, status }) => {

  return (
    <button className={`tag ${status ? 'tagged' : 'not-tagged'}`} id={name} onClick={(e) => toggleTag(e, name)}>{name}</button>
  )
}

export default Tag; 