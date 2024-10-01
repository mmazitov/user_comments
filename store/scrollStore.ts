// scrollStore.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ScrollState {
  scrollPosition: number;
}

const initialState: ScrollState = {
  scrollPosition: 0,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload; // Устанавливаем позицию скролла
    },
  },
});

export const { setScrollPosition } = scrollSlice.actions;
export default scrollSlice.reducer;
