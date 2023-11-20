import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    name: ""
  },
  reducers: {
    setPlayerName: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { setPlayerName } = playerSlice.actions;
export default playerSlice.reducer;
