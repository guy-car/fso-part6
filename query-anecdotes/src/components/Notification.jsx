import { useNotificationMessage } from '../NotificationContext'

const Notification = () => {

  const notification = useNotificationMessage()

  console.log('notification is: ', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.visible) return null

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
