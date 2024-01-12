import React from 'react'

const Buttons = ({ updateGood, updateBad, updateNeutral }) => {
  return (
    <>
      <button onClick={updateGood}>{'Good'}</button>
      <button onClick={updateNeutral}>{'Neutral'}</button>
      <button onClick={updateBad}>{'Bad'}</button>
    </>
  )
}

export default Buttons
