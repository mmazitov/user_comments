import { PayloadAction, createSlice } from '@reduxjs/toolkit'; // Importing necessary functions from Redux Toolkit

// Define the structure of the scroll state
interface ScrollState {
  scrollPosition: number; // Property to hold the current scroll position
}

// Initial state for the scroll slice
const initialState: ScrollState = {
  scrollPosition: 0, // Default scroll position set to 0
};

// Create a slice for managing scroll state
const scrollSlice = createSlice({
  name: 'scroll', // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Action to set the scroll position
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload; // Update the scroll position in the state
    },
  },
});

// Exporting the action for setting the scroll position
export const { setScrollPosition } = scrollSlice.actions;

// Exporting the reducer to be used in the store
export default scrollSlice.reducer;
