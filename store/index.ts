import commentsReducer from '@/store/commentsStore'; // Reducer for comments
import { configureStore } from '@reduxjs/toolkit'; // Importing configureStore from Redux Toolkit
import formReducer from '@/store/formStore'; // Reducer for form management
import scrollReducer from '@/store/scrollStore'; // Reducer for scroll position management

// Create the Redux store
const store = configureStore({
	reducer: {
		form: formReducer, // Adding the form reducer to the store
		comments: commentsReducer, // Adding the comments reducer to the store
		scroll: scrollReducer, // Adding the scroll reducer to the store
	},
});

// Exporting types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>; // Type for the state of the store
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function of the store

export default store; // Exporting the configured store
