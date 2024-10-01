import dynamic from 'next/dynamic';

// Dynamically import the CommentList component
const DynamicCommentList = dynamic(
	() => import('@/app/components/comments/CommentsList'), // Import the CommentList component
	{ ssr: false } // Disable server-side rendering for this component
);

export default DynamicCommentList; // Export the dynamically imported component
