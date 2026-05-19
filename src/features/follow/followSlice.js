import { createSlice } from "@reduxjs/toolkit";

const followSlice = createSlice({
  name: "follow",
  initialState: { following: [] },
  reducers: {
    toggleFollow: (state, action) => {
      const idx = state.following.indexOf(action.payload);
      if (idx > -1) state.following.splice(idx, 1);
      else state.following.push(action.payload);
    },
  },
});

export const { toggleFollow } = followSlice.actions;
export default followSlice.reducer;
