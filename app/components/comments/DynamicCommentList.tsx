import dynamic from 'next/dynamic';

const DynamicCommentList = dynamic(
	() => import('@/app/components/comments/CommentsList'),
	{ ssr: false }
);

export default DynamicCommentList;
