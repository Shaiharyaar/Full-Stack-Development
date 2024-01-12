import { useState } from 'react'
import Header from './components/Header'
import Buttons from './components/Buttons'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => setGood((prev) => prev + 1)
  const updateNeutral = () => setNeutral((prev) => prev + 1)
  const updateBad = () => setBad((prev) => prev + 1)

  return (
    <>
      <Header title={'Give feedback'} />
      <Buttons updateGood={updateGood} updateNeutral={updateNeutral} updateBad={updateBad} />
      <Header title={'Statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
