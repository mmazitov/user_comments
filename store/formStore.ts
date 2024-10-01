import { PayloadAction, createSlice } from '@reduxjs/toolkit'; // Importing necessary functions from Redux Toolkit

// Define the structure of your form state
export interface FormValues {
	inputSearch: string; // Search input value
	inputAddOne: string; // Additional input field one
	inputAddTwo: string; // Additional input field two
	textareaAdd: string; // Textarea input value
}

// Interface representing the overall form state
interface FormState {
	values: FormValues; // Form values
}

// Function to initialize state from localStorage
const getInitialState = (): FormState => {
	// Check if the code is running in the browser
	if (typeof window !== 'undefined') {
		return {
			values: {
				inputSearch: localStorage.getItem('formInputSearch') || '', // Load search input from localStorage
				inputAddOne: localStorage.getItem('formInputAddOne') || '', // Load first additional input from localStorage
				inputAddTwo: localStorage.getItem('formInputAddTwo') || '', // Load second additional input from localStorage
				textareaAdd: localStorage.getItem('formTextareaAdd') || '', // Load textarea input from localStorage
			},
		};
	}
	// Return initial state with empty values if on the server
	return { values: { inputSearch: '', inputAddOne: '', inputAddTwo: '', textareaAdd: '' } };
};

// Create a slice of the Redux store for the form
const formSlice = createSlice({
	name: 'form', // Name of the slice
	initialState: getInitialState(), // Initial state defined above
	reducers: {
		// Action to set input values
		setInputValue: (state, action: PayloadAction<{ field: keyof FormValues; value: string }>) => {
			const { field, value } = action.payload; // Destructure field and value from action payload
			state.values[field] = value; // Update the specific field in state

			// Save the value in localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem(`form${field.charAt(0).toUpperCase() + field.slice(1)}`, value); // Update localStorage with the new value
			}
		},
	},
});

// Export actions and reducer
export const { setInputValue } = formSlice.actions; // Exporting the setInputValue action for use in components
export default formSlice.reducer; // Exporting the reducer to be used in the store
