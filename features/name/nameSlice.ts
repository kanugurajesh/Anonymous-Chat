import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface name {
  name: string;
}

const initialState: name = {
  name: '',
};

const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    addName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    clearName(state) {
      state.name = '';
    },
  },
});

export const { addName, clearName } = nameSlice.actions;
export default nameSlice.reducer;
