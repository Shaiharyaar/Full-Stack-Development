import { useNotificationValue } from '../context/Notification'
const Notification = () => {
  const { color = 'green', message } = useNotificationValue() ?? {}
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
