import React from 'react'

const Controls = ({ saveCalendar, getShoppingList }) => {

  return (
      <div id='controls-container' className='flex'>
        <button className='submit' id='save-calendar' onClick={saveCalendar}>Save Calendar</button>
        <button className='submit' id='get-list' onClick={getShoppingList}>Get Shopping List</button>
      </div>
    )
}

export default Controls; 