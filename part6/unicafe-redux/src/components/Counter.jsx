import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  goodIncrement,
  badIncrement,
  okIncrement,
  resetCounter,
} from '../redux/actions/counterActions'

const Counter = () => {
  const goodState = useSelector((state) => state.good)
  const badState = useSelector((state) => state.bad)
  const okState = useSelector((state) => state.ok)

  const dispatch = useDispatch()

  const good = () => {
    dispatch(goodIncrement())
  }
  const ok = () => {
    dispatch(okIncrement())
  }
  const bad = () => {
    dispatch(badIncrement())
  }
  const reset = () => {
    dispatch(resetCounter())
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {goodState}</div>
      <div>ok {okState}</div>
      <div>bad {badState}</div>
    </div>
  )
}

export default Counter
