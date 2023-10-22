import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return ''
    }
  }
})

export const { notificationChange, resetNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(notificationChange(text))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time*1000)
    
  }
}

export default notificationSlice.reducer
