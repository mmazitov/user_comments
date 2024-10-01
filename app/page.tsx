'use client';

import CommentList from './components/comments/DynamicCommentList';
import DynamicCommentList from './components/comments/DynamicCommentList';
import FormAdd from './components/forms/FormAdd';
import { Provider } from 'react-redux';
import store from '@/store/index';
import { useScrollManager } from '@/app/utils/scrollManager';

const PageContent = () => {
	useScrollManager(); // Теперь вызываем хук внутри компонента, находящегося под провайдером

	return (
		<>
			<FormAdd />
			<DynamicCommentList />
		</>
	);
};

const page = () => {
	return (
		<div className="mx-auto pt-10 container">
			<Provider store={store}>
				<PageContent /> {/* Вложенный компонент с вызовом useScrollManager */}
			</Provider>
		</div>
	);
};

export default page;
