import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        // eslint-disable-next-line no-unused-vars
        clearNotification(state, action) {
            return ''
          }
    }
})

export const setTemporaryNotification = (message, seconds) => {
    return dispatch => {
      dispatch(setNotification(message))
      
      setTimeout(() => {
        dispatch(clearNotification())
      }, seconds * 1000)
    }
  }

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer