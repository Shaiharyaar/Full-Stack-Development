import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeNotification } from '../redux/reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const style = {
    display: notification ? '' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  useEffect(() => {
    if (notification !== '') {
      const timeoutId = setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      return () => {
        timeoutId && clearTimeout(timeoutId)
      }
    }
  }, [dispatch, notification])

  return <div style={style}>{notification}</div>
}

export default Notification
