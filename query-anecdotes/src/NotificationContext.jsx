import { createContext, useReducer, useContext } from 'react'

const initialState = { message: null, type: null, visible: false }

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return { 
        message: action.payload.message, 
        type: action.payload.type, 
        visible: true 
  }
    case "HIDE":
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch] }>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext