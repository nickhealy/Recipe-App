import React from 'react';
import Tag from '../Views/Tag';

const TagContainer = ({toggleTag, tags}) => {

  const tagNames = ['breakfast', 'easy', 'vegetarian', 'cheap', 'for two', 'lunch', 'dinner', 'snack', 'drink', 'fancy', 'dessert'];
  const tagList = tagNames.map(name => {

    const status = tags.includes(name);
    return <Tag name={name} toggleTag={toggleTag} key={`tag_${name}`} status={status} />
  })
  return (
    <ul id='tag-container'>
      {tagList}
    </ul>
  )
}

export default TagContainer; 