const Notification = ({ color = 'green', message }) => {
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
