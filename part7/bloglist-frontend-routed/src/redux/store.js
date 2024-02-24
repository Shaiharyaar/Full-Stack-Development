// @ts-ignore
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

export default store
