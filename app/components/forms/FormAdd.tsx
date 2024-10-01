'use client'; // Indicates that this component should be rendered on the client-side only

import { FormValues, setInputValue } from '@/store/formStore'; // Import the FormValues interface and the action to set input values
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for Redux state management

import { Button } from '@/components/ui/button'; // Import custom Button component
import { Comment } from '@/models/comments'; // Import the Comment model
import { Input } from '@/components/ui/input'; // Import custom Input component
import { Label } from '@/components/ui/label'; // Import custom Label component
import { RootState } from '@/store/index'; // Import RootState type for state selection
import { Textarea } from '@/components/ui/textarea'; // Import custom Textarea component
import { addComment } from '@/store/commentsStore'; // Import the action to add a new comment

const FormAdd = () => {
	const dispatch = useDispatch(); // Get the dispatch function from Redux
	const { inputAddOne, inputAddTwo, textareaAdd } = useSelector(
		// Extract values from the form state
		(state: RootState) => state.form.values
	);

	// Handle changes in the input fields
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target; // Get the name and value from the input event
		dispatch(setInputValue({ field: name as keyof FormValues, value })); // Dispatch the action to update the state with the new value
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent the default form submission behavior (page reload)

		// Create a new comment object
		const newComment: Comment = {
			id: Date.now(), // Generate a unique ID for the comment based on the current timestamp
			user: {
				username: inputAddTwo, // Use the nickname as the username
				fullName: inputAddOne, // Use the full name from the form
			},
			body: textareaAdd, // Set the body of the comment
			likes: 0, // Initialize likes count to 0
		};

		// Dispatch the action to add the new comment to the Redux store
		dispatch(addComment(newComment));

		// Reset form input values to empty strings after submission
		dispatch(setInputValue({ field: 'inputAddOne', value: '' }));
		dispatch(setInputValue({ field: 'inputAddTwo', value: '' }));
		dispatch(setInputValue({ field: 'textareaAdd', value: '' }));
	};

	return (
		<div className="mb-4 w-3/12">
			{/* Set the width and margin of the form container */}
			<form
				onSubmit={handleSubmit} // Set the form submission handler
				className="relative flex flex-col gap-y-5 w-full" // Flexbox styling for the form layout
			>
				<div>
					<Label>Full name</Label> {/*Label for the full name input */}
					<Input
						type="text" // Specify input type
						placeholder="Full name" // Placeholder text
						name="inputAddOne" // Name attribute for the input
						onChange={handleChange} // Set the change handler
						value={inputAddOne} // Bind the input value to the state
						required // Mark the input as required
					/>
				</div>
				<div>
					<Label>Nickname</Label> {/* Label for the nickname input */}
					<Input
						type="text" // Specify input type
						placeholder="Nickname" // Placeholder text
						name="inputAddTwo" // Name attribute for the input
						onChange={handleChange} // Set the change handler
						value={inputAddTwo} // Bind the input value to the state
						required // Mark the input as required
					/>
				</div>
				<div>
					<Label>Comment</Label> {/* Label for the comment textarea */}
					<Textarea
						className="h-fit" // Custom class for the textarea
						placeholder="Comment" // Placeholder text
						name="textareaAdd" // Name attribute for the textarea
						onChange={handleChange} // Set the change handler
						value={textareaAdd} // Bind the textarea value to the state
						required // Mark the textarea as required
					/>
				</div>
				<Button type="submit">Add</Button> {/* Button to submit the form */}
			</form>
		</div>
	);
};

export default FormAdd; // Export the FormAdd component for use in other parts of the application
