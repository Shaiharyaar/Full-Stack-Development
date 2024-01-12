import React from 'react'

const Statistics = ({ good, bad, neutral }) => {
  const allStats = good + bad + neutral
  const average = (good + bad + neutral) / 3
  const percentage = allStats > 0 ? (good / allStats) * 100 : 0

  if (allStats === 0)
    return (
      <table>
        <tbody>
          <Statement text={'No feedback Given'} />
        </tbody>
      </table>
    )
  return (
    <table>
      <tbody>
        <Statement text={'Good'} value={good} />
        <Statement text={'Neutral'} value={neutral} />
        <Statement text={'Bad'} value={bad} />
        <Statement text={'All'} value={allStats} />
        <Statement text={'Average'} value={average} />
        <Statement text={'Positive'} value={`${percentage}%`} />
      </tbody>
    </table>
  )
}

const Statement = ({ text, value = '' }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

export default Statistics
