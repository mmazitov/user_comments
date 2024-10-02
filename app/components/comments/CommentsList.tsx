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

import { Button } from '@/components/ui/button';
import { FaCommentSlash } from 'react-icons/fa6';
import { RootState } from '@/store/index';
import { fetchComments } from '../../api/comments/comments';
import { useEffect } from 'react';

const CommentList = () => {
	const dispatch = useDispatch();

	// Select comments and filter user from the Redux store
	const comments = useSelector((state: RootState) => state.comments.comments);
	const filteredUser = useSelector(
		(state: RootState) => state.comments.filteredUser
	);
	const { inputSearch } = useSelector((state: RootState) => state.form.values);
	const scrollPosition = useSelector(
		(state: RootState) => state.scroll.scrollPosition
	);

	// Load comments from localStorage or fetch from API on component mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedComments = localStorage.getItem('comments');
			if (savedComments) {
				dispatch(setComments(JSON.parse(savedComments))); // Set comments from localStorage
			} else {
				const loadComments = async () => {
					const fetchedComments = await fetchComments(); // Fetch comments from API
					dispatch(setComments(fetchedComments)); // Set comments in the Redux store
					localStorage.setItem('comments', JSON.stringify(fetchedComments)); // Save to localStorage
				};
				loadComments();
			}
		}
	}, [dispatch]);

	// Load filtered user from localStorage on component mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedUser = localStorage.getItem('filteredUser');
			if (savedUser) {
				dispatch(filterCommentsByUser(savedUser)); // Set filtered user if exists
			}
		}
	}, [dispatch]);

	// Scroll to the last saved position when comments are updated
	useEffect(() => {
		if (comments.length > 0) {
			window.scrollTo(0, scrollPosition); // Scroll to the saved position
		}
	}, [comments, scrollPosition]);

	// Handle deleting a comment and update localStorage
	const handleDelete = (commentId: number) => {
		dispatch(deleteComment(commentId)); // Dispatch delete comment action
		if (typeof window !== 'undefined') {
			const updatedComments = comments.filter(
				(comment) => comment.id !== commentId // Filter out the deleted comment
			);
			localStorage.setItem('comments', JSON.stringify(updatedComments)); // Update localStorage
		}
	};

	// Handle liking a comment and update localStorage
	const handleLike = (commentId: number) => {
		dispatch(incrementLikes(commentId)); // Dispatch increment likes action
		if (typeof window !== 'undefined') {
			localStorage.setItem(
				'comments',
				JSON.stringify(
					comments.map((comment) =>
						comment.id === commentId
							? { ...comment, likes: comment.likes + 1 } // Increment likes
							: comment
					)
				)
			); // Update localStorage
		}
	};

	// Filter comments based on the selected user or search input
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

	// Handle user click to filter comments by the selected user
	const handleUserClick = (user: string) => {
		dispatch(filterCommentsByUser(user)); // Set the selected user for filtering
		if (typeof window !== 'undefined') {
			localStorage.setItem('filteredUser', user); // Save the selected user in localStorage
		}
	};

	// Reset the comment filter
	const handleResetFilter = () => {
		dispatch(filterCommentsByUser('')); // Clear the filter
		if (typeof window !== 'undefined') {
			localStorage.removeItem('filteredUser'); // Remove saved user filter from localStorage
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
			<div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4">
				{filteredComments.map((comment) => (
					<Card key={comment.id}>
						<CardHeader>
							<CardTitle
								onClick={() =>
									comment.user?.username && handleUserClick(comment.user.username)
								}
								className="hover:underline cursor-pointer"
							>
								{comment.user.username} {/* Display username */}
							</CardTitle>
							<CardDescription
								onClick={() =>
									comment.user?.fullName && handleUserClick(comment.user.fullName)
								}
								className="hover:underline cursor-pointer"
							>
								{comment.user.fullName} {/* Display full name */}
							</CardDescription>
						</CardHeader>
						<CardContent>{comment.body}</CardContent> {/* Display comment body */}
						<CardFooter className="flex justify-between">
							<span
								className="hover:underline cursor-pointer"
								onClick={() => handleLike(comment.id)} // Handle like button click
							>
								Likes: {comment.likes} {/* Display likes count */}
							</span>
							<Button onClick={() => handleDelete(comment.id)}>
								{/* Handle delete button click */}
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
