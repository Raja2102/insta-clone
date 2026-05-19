import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import followReducer from "../features/follow/followSlice";
import savedReducer from "../features/saved/savedSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    notifications: notificationReducer,
    follow: followReducer,
    saved: savedReducer,
    theme: themeReducer,
  },
});
