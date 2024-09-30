'use client';

import { FormValues, setInputValue } from '@/store/formStore';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Comment } from '@/models/comments'; // Импортируйте модель Comment
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RootState } from '@/store/index';
import { Textarea } from '@/components/ui/textarea';
import { addComment } from '@/store/commentsStore'; // Импортируем новый экшен

const FormAdd = () => {
	const dispatch = useDispatch();
	const { inputAddOne, inputAddTwo, textareaAdd } = useSelector(
		(state: RootState) => state.form.values
	);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		dispatch(setInputValue({ field: name as keyof FormValues, value })); // Type assertion
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы

		// Создаем новый комментарий
		const newComment: Comment = {
			id: Date.now(), // Генерируем уникальный ID для комментария
			user: {
				username: inputAddTwo, // Используем никнейм как имя пользователя
				fullName: inputAddOne, // Используем полное имя
			},
			body: textareaAdd,
			likes: 0, // Начальное значение лайков
		};

		// Добавляем новый комментарий в стор
		dispatch(addComment(newComment));

		// Обнуляем значения формы
		dispatch(setInputValue({ field: 'inputAddOne', value: '' }));
		dispatch(setInputValue({ field: 'inputAddTwo', value: '' }));
		dispatch(setInputValue({ field: 'textareaAdd', value: '' }));
	};

	return (
		<div className="mb-4 w-3/12">
			<form
				onSubmit={handleSubmit}
				className="relative flex flex-col gap-y-5 w-full"
			>
				<div>
					<Label>Full name</Label>
					<Input
						type="text"
						placeholder="Full name"
						name="inputAddOne"
						onChange={handleChange}
						value={inputAddOne}
					/>
				</div>
				<div>
					<Label>Nickname</Label>
					<Input
						type="text"
						placeholder="Nickname"
						name="inputAddTwo"
						onChange={handleChange}
						value={inputAddTwo}
					/>
				</div>
				<div>
					<Label>Comment</Label>
					<Textarea
						className="h-fit"
						placeholder="Comment"
						name="textareaAdd"
						onChange={handleChange}
						value={textareaAdd}
					/>
				</div>
				<Button type="submit">Add</Button>
			</form>
		</div>
	);
};

export default FormAdd;
