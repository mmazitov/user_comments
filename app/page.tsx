'use client';

import CommentList from './components/CommentsList';
import FormAdd from './components/forms/FormAdd';
import { Provider } from 'react-redux';
import store from '@/store/index';

const page = () => {
	return (
		<div className="mx-auto pt-10 container">
			<Provider store={store}>
				<FormAdd />
				<CommentList />
			</Provider>
		</div>
	);
};

export default page;
