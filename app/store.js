// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from 'counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// import postsReducer from '../features/posts/postsSlice'
// import usersReducer from '../features/users/usersSlice'
// import notificationsReducer from '../features/notifications/notificationsSlice'
// import { apiSlice } from '../features/api/apiSlice'

// export default configureStore({
//   reducer: {
//     posts: postsReducer,
//     users: usersReducer,
//     notifications: notificationsReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(apiSlice.middleware)
// })


import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiCourse } from 'app/api/apiCourse';
import { apiRequirents } from 'app/api/apiRequirents';

export const store = configureStore({
  reducer: {
    [apiCourse.reducerPath]: apiCourse.reducer,
    [apiRequirents.reducerPath]: apiRequirents.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(apiCourse.middleware)
    .concat(apiRequirents.middleware),
});

setupListeners(store.dispatch);