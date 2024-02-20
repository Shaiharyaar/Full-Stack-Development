// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notificationSetter(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})

export const { notificationSetter, removeNotification } = notificationSlice.actions

export const setNotification = (message, timer) => {
  return async (dispatch) => {
    dispatch(notificationSetter(message))
    setTimeout(() => dispatch(removeNotification()), timer)
  }
}

export default notificationSlice.reducer
