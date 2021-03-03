import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './posts/postsSlice'
import usersReducer from './users/usersSlice'
import notificationsReducer from './notifications/notificationsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
  },
})
