import React from 'react'

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1
  }

  return arr.indexOf(Math.max(...arr))
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotedIndex = indexOfMax(votes)

  return (
    <>
      {anecdotes[maxVotedIndex]}
      <div>has {votes[maxVotedIndex]} votes</div>
    </>
  )
}

export default MostVotedAnecdote
