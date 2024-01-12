import React from 'react'

const Statistics = ({ good, bad, neutral }) => {
  const allStats = good + bad + neutral
  const average = (good + bad + neutral) / 3
  const percentage = allStats > 0 ? (good / allStats) * 100 : 0

  if (allStats === 0) return <Statement label={'No feedback Given'} />
  return (
    <>
      <Statement label={'Good'} count={good} />
      <Statement label={'Neutral'} count={neutral} />
      <Statement label={'Bad'} count={bad} />
      <Statement label={'All'} count={allStats} />
      <Statement label={'Average'} count={average} />
      <Statement label={'Positive'} count={`${percentage}%`} />
    </>
  )
}

const Statement = ({ label, count = '' }) => (
  <p>
    {label} {count}
  </p>
)

export default Statistics
