import commentsReducer from '@/store/commentsStore'; // Редюсер для комментариев
import { configureStore } from '@reduxjs/toolkit';
import formReducer from '@/store/formStore'; // Редюсер для формы

// Создаем хранилище
const store = configureStore({
	reducer: {
		form: formReducer,
		comments: commentsReducer,
	},
});

// Экспортируем типы RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;