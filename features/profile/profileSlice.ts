import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface profile {
  profile: string;
}

const initialState: profile = {
  profile: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile(state, action: PayloadAction<string>) {
      state.profile = action.payload;
    },
    clearProfile(state) {
      state.profile = "";
    },
  },
});

export const { addProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
