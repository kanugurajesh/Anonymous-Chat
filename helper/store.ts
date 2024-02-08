import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "@/features/chats/chatSlice"
import profileReducer from "@/features/profile/profileSlice"
import nameReducer from "@/features/name/nameSlice"

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    profile: profileReducer,
    name: nameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;