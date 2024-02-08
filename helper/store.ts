import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "@/features/chats/chatSlice"
import profileReducer from "@/features/profile/profileSlice"

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;