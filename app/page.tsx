'use client'; // Indicates that this component is a client component in Next.js

import DynamicCommentList from './components/comments/DynamicCommentList'; // Importing DynamicCommentList component
import FormAdd from './components/forms/FormAdd'; // Importing FormAdd component for adding comments
import { Provider } from 'react-redux'; // Importing Provider from React Redux for state management
import store from '@/store/index'; // Importing the Redux store
import { useScrollManager } from '@/app/utils/scrollManager'; // Importing custom hook for managing scroll position

const PageContent = () => {
	useScrollManager(); // Calling the useScrollManager hook to manage scroll position within this component

	return (
		<>
			<FormAdd /> {/* Render the form for adding new comments */}
			<DynamicCommentList /> {/* Render the dynamic comment list */}
		</>
	);
};

const page = () => {
	return (
		<div className="mx-auto pt-10 container">
			{' '}
			{/* Wrapper for centering content with padding */}
			<Provider store={store}>
				{' '}
				{/* Provide the Redux store to the component tree */}
				<PageContent />{' '}
				{/* Render PageContent which includes FormAdd and DynamicCommentList */}
			</Provider>
		</div>
	);
};

export default page; // Export the page component as the default export
