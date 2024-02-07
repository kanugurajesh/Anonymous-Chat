import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chatsState {
  chats: Array<{}>;
}

const initialState: chatsState = {
  chats: [{}],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat(state, action: PayloadAction<{}>) {
      state.chats.push(action.payload);
    },
    clearChat(state) {
      state.chats = [];
    }
  },
});

export const {addChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
