import { Comment } from '@/models/comments';

export const fetchComments = async (): Promise<Comment[]> => {
	const response = await fetch('https://dummyjson.com/comments');
	const data = await response.json();
	return data.comments;
};
