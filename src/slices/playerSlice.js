// Importing createSlice from Redux Toolkit for creating slices
import { createSlice } from "@reduxjs/toolkit";

// Creating a slice for the player
const playerSlice = createSlice({
  name: "player", // Slice name, used to generate action types
  initialState: {
    name: "" // Initial state of the player, with an empty name
  },
  reducers: {
    // Action to set the player name
    setPlayerName: (state, action) => {
      state.name = action.payload; // Update the player's name with the payload from the action
    }
  }
});

// Exporting the action created by the playerSlice
export const { setPlayerName } = playerSlice.actions;

// Exporting the reducer created by the playerSlice
export default playerSlice.reducer;
