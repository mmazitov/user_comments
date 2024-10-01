'use client'; // Indicates that this component should be rendered on the client-side only

import { FormValues, setInputValue } from '@/store/formStore'; // Import the action to set input values and the FormValues type
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for accessing Redux state and dispatching actions

import { Input } from '@/components/ui/input'; // Import custom Input component for the search field
import { Label } from '@/components/ui/label'; // Import custom Label component for form labels
import { RootState } from '@/store/index'; // Import the RootState type for accessing the Redux store state

const FormSearch = () => {
	const dispatch = useDispatch(); // Get the dispatch function from Redux
	const { inputSearch } = useSelector((state: RootState) => state.form.values); // Extract inputSearch value from the Redux state

	// Handle changes in the search input field
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target; // Get the name and value from the input event
		dispatch(setInputValue({ field: name as keyof FormValues, value })); // Dispatch action to update the state with the new value (type assertion)
	};

	return (
		<div>
			<form action="" className="relative flex-center w-full">
				{/* Form container with styling */}
				<Label>Search</Label> {/* Label for the search input */}
				<Input
					name="inputSearch" // Name attribute that matches the field in FormValues
					type="text" // Specify input type as text
					placeholder="Search" // Placeholder text for the input field
					onChange={handleChange} // Set the change handler to manage input changes
					value={inputSearch} // Bind the input value to the state from Redux
				/>
			</form>
		</div>
	);
};

export default FormSearch; // Export the FormSearch component for use in other parts of the application
