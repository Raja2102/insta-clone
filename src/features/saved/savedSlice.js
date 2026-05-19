import { createSlice } from "@reduxjs/toolkit";

const savedSlice = createSlice({
  name: "saved",
  initialState: { savedPosts: [] },
  reducers: {
    toggleSave: (state, action) => {
      const idx = state.savedPosts.indexOf(action.payload);
      if (idx > -1) state.savedPosts.splice(idx, 1);
      else state.savedPosts.push(action.payload);
    },
  },
});

export const { toggleSave } = savedSlice.actions;
export default savedSlice.reducer;
