// scrollStore.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ScrollState {
  scrollPosition: number; // Позиция прокрутки страницы
}

const initialState: ScrollState = {
  scrollPosition: 0, // Изначально 0
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload; // Устанавливаем позицию прокрутки
    },
  },
});

// Экспортируем экшен и редюсер
export const { setScrollPosition } = scrollSlice.actions;
export default scrollSlice.reducer;
