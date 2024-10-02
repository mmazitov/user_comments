'use client'; // Indicates that this component should be rendered on the client-side only

import { FormValues, setInputValue, resetInputSearch } from '@/store/formStore'; // Import the action to set input values and the FormValues type
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for accessing Redux state and dispatching actions

import { Input } from '@/components/ui/input'; // Import custom Input component for the search field
import { Label } from '@/components/ui/label'; // Import custom Label component for form labels
import { RootState } from '@/store/index'; // Import the RootState type for accessing the Redux store state
import { Button } from '@/components/ui/button';

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

	// Handle form submission to reset the input search
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent the default form submission behavior
		dispatch(resetInputSearch()); // Dispatch action to reset the inputSearch value
	};

	return (
		<div>
			<form
				action=""
				className="relative flex flex-row flex-center items-end gap-5 w-full"
				onSubmit={handleReset} // Handle the form submission for resetting
			>
				{/* Form container with styling */}
				<div>
					<Label>Search</Label> {/* Label for the search input */}
					<Input
						name="inputSearch" // Name attribute that matches the field in FormValues
						type="text" // Specify input type as text
						placeholder="Search" // Placeholder text for the input field
						onChange={handleChange} // Set the change handler to manage input changes
						value={inputSearch} // Bind the input value to the state from Redux
					/>
				</div>
				<Button type="submit">Reset</Button>{' '}
				{/* Button to submit the search form */}
			</form>
		</div>
	);
};

export default FormSearch; // Export the FormSearch component for use in other parts of the application
