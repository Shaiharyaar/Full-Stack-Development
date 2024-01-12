import { useState } from 'react'

import Header from './components/Header'
import MostVotedAnecdote from './components/MostVotedAnecdote'

const generateArray = (length) => {
  return Array.from({ length }, () => 0)
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const [votes, setVotes] = useState(generateArray(anecdotes.length))

  const [selected, setSelected] = useState(0)

  const handleNextSelect = () => {
    let isLoop = true
    while (isLoop) {
      const randomSelection = getRandomInt(0, anecdotes.length - 1)
      if (randomSelection !== selected) {
        setSelected(randomSelection)
        isLoop = false
      }
    }
  }

  const handleVoteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <>
      <Header title={'Anecdote of the day'} />
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <>
        <button onClick={handleVoteClick}>{'Vote'}</button>
        <button onClick={handleNextSelect}>{'Next anecdote'}</button>
      </>
      <Header title={'Anecdote with most votes'} />
      <div>
        <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
      </div>
    </>
  )
}

export default App
