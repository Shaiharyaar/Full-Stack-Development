import { useSelector } from 'react-redux'
const Notification = () => {
  const { color = 'green', message } =
    useSelector(state => state.notification) ?? {}
  if (!message) {
    return null
  }

  const notificationStyle = {
    color
  }

  return (
    <div id={'notification-id'} className={'error'} style={notificationStyle}>
      {message}
    </div>
  )
}
export default Notification
