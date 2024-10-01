import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	deleteComment,
	filterCommentsByUser,
	incrementLikes,
	setComments,
} from '@/store/commentsStore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// CommentList.tsx
import { Button } from '@/components/ui/button';
import { FaCommentSlash } from 'react-icons/fa6';
import { RootState } from '@/store/index';
import { fetchComments } from '../../api/comments/comments';
import { setScrollPosition } from '@/store/scrollStore';

const CommentList = () => {
	const dispatch = useDispatch();
	const comments = useSelector((state: RootState) => state.comments.comments);
	const filteredUser = useSelector(
		(state: RootState) => state.comments.filteredUser
	);
	const { inputSearch } = useSelector((state: RootState) => state.form.values);
	const scrollPosition = useSelector(
		(state: RootState) => state.scroll.scrollPosition
	);

	// Загрузка комментариев из localStorage на клиенте
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedComments = localStorage.getItem('comments');
			if (savedComments) {
				dispatch(setComments(JSON.parse(savedComments)));
			} else {
				const loadComments = async () => {
					const fetchedComments = await fetchComments();
					dispatch(setComments(fetchedComments));
					localStorage.setItem('comments', JSON.stringify(fetchedComments));
				};
				loadComments();
			}
		}
	}, [dispatch]);

	// Загрузка выбранного пользователя для фильтрации из localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedUser = localStorage.getItem('filteredUser');
			if (savedUser) {
				dispatch(filterCommentsByUser(savedUser)); // Убедитесь, что savedUser существует
			}
		}
	}, [dispatch]);

	useEffect(() => {
		if (comments.length > 0) {
			window.scrollTo(0, scrollPosition);
		}
	}, [comments, scrollPosition]);

	const handleDelete = (commentId: number) => {
		dispatch(deleteComment(commentId));
		if (typeof window !== 'undefined') {
			const updatedComments = comments.filter(
				(comment) => comment.id !== commentId
			);
			localStorage.setItem('comments', JSON.stringify(updatedComments));
		}
	};

	const handleLike = (commentId: number) => {
		dispatch(incrementLikes(commentId));
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'comments',
				JSON.stringify(
					comments.map((comment) =>
						comment.id === commentId
							? { ...comment, likes: comment.likes + 1 }
							: comment
					)
				)
			);
		}
	};

	// Фильтрация комментариев по имени пользователя или никнейму
	const filteredComments = filteredUser
		? comments.filter(
				(comment) =>
					comment.user.username === filteredUser ||
					comment.user.fullName === filteredUser
		  )
		: inputSearch
		? comments.filter(
				(comment) =>
					comment.body?.toLowerCase().includes(inputSearch.toLowerCase()) ||
					comment.user?.username?.toLowerCase().includes(inputSearch.toLowerCase())
		  )
		: comments;

	const handleUserClick = (user: string) => {
		dispatch(filterCommentsByUser(user)); // Устанавливаем выбранного пользователя для фильтрации
		if (typeof window !== 'undefined') {
			localStorage.setItem('filteredUser', user); // Сохраняем выбранного пользователя в localStorage
		}
	};

	const handleResetFilter = () => {
		dispatch(filterCommentsByUser('')); // Сбрасываем фильтр
		if (typeof window !== 'undefined') {
			localStorage.removeItem('filteredUser'); // Удаляем сохраненный пользовательский фильтр из localStorage
		}
	};

	return (
		<div>
			<h1 className="mb-5 text-2xl">Comments:</h1>
			{filteredUser && (
				<Button onClick={handleResetFilter} className="mb-4">
					Show All Comments
				</Button>
			)}
			<div className="gap-4 grid grid-cols-4">
				{filteredComments.map((comment) => (
					<Card key={comment.id}>
						<CardHeader>
							<CardTitle
								onClick={() =>
									comment.user?.username && handleUserClick(comment.user.username)
								}
								className="hover:underline cursor-pointer"
							>
								{comment.user.username}
							</CardTitle>
							<CardDescription
								onClick={() =>
									comment.user?.fullName && handleUserClick(comment.user.fullName)
								}
								className="hover:underline cursor-pointer"
							>
								{comment.user.fullName}
							</CardDescription>
						</CardHeader>
						<CardContent>{comment.body}</CardContent>
						<CardFooter className="flex justify-between">
							<span
								className="hover:underline cursor-pointer"
								onClick={() => handleLike(comment.id)}
							>
								Likes: {comment.likes}
							</span>
							<Button onClick={() => handleDelete(comment.id)}>
								<FaCommentSlash />
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default CommentList;
