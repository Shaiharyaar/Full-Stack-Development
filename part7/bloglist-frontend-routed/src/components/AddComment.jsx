import React from 'react'

const AddComment = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input name={'comment'} placeholder={'Enter a comment'} />
      <button>{'add comment'}</button>
    </form>
  )
}

export default AddComment
