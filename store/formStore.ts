import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of your form state
export interface FormValues {
	inputSearch: string;
	inputAddOne: string;
	inputAddTwo: string;
	textareaAdd: string;
}

interface FormState {
	values: FormValues;
}

// Function to initialize state from localStorage
const getInitialState = (): FormState => {
	if (typeof window !== 'undefined') {
		return {
			values: {
				inputSearch: localStorage.getItem('formInputSearch') || '',
				inputAddOne: localStorage.getItem('formInputAddOne') || '',
				inputAddTwo: localStorage.getItem('formInputAddTwo') || '',
				textareaAdd: localStorage.getItem('formTextareaAdd') || '',
			},
		};
	}
	return { values: { inputSearch: '', inputAddOne: '', inputAddTwo: '', textareaAdd: '' } };
};

const formSlice = createSlice({
	name: 'form',
	initialState: getInitialState(),
	reducers: {
		setInputValue: (state, action: PayloadAction<{ field: keyof FormValues; value: string }>) => {
			const { field, value } = action.payload;
			state.values[field] = value;

			// Save the value in localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem(`form${field.charAt(0).toUpperCase() + field.slice(1)}`, value);
			}
		},
	},
});

// Export actions and reducer
export const { setInputValue } = formSlice.actions;
export default formSlice.reducer;
