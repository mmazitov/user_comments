import { PayloadAction, createSlice } from '@reduxjs/toolkit'; // Importing necessary functions from Redux Toolkit

import { Comment } from '@/models/comments'; // Importing the Comment model

// Interface to define the structure of the comments state
interface CommentsState {
  comments: Comment[]; // Array of comments
  filteredUser: string | null; // User whose comments are filtered
}

// Function to load comments from localStorage
const loadCommentsFromLocalStorage = (): Comment[] => {
  // Check if the code is running in the browser
  if (typeof window !== 'undefined') {
    const savedComments = localStorage.getItem('comments'); // Attempt to retrieve comments from localStorage
    return savedComments ? JSON.parse(savedComments) : []; // Parse and return comments or an empty array
  }
  return []; // Return an empty array if on the server
};

// Initial state of the comments slice
const initialState: CommentsState = {
  comments: loadCommentsFromLocalStorage(), // Load comments from localStorage at the start
  filteredUser: null, // Initial value for filteredUser
};

// Create a slice of the Redux store for comments
const commentsSlice = createSlice({
  name: 'comments', // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Action to set comments
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload; // Update state with new comments
      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments)); // Save comments to localStorage
      }
    },
    // Action to delete a comment by its ID
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload); // Remove comment from state
      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments)); // Update localStorage
      }
    },
    // Action to increment likes for a specific comment
    incrementLikes: (state, action: PayloadAction<number>) => {
      const comment = state.comments.find((comment) => comment.id === action.payload); // Find the comment by ID
      if (comment) {
        comment.likes += 1; // Increment likes count
        if (typeof window !== 'undefined') {
          localStorage.setItem('comments', JSON.stringify(state.comments)); // Update localStorage
        }
      }
    },
    // Action to filter comments by user
    filterCommentsByUser: (state, action: PayloadAction<string | null>) => {
      state.filteredUser = action.payload; // Update the filtered user
    },
    // Action to add a new comment
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload); // Add the new comment at the beginning of the array
      if (typeof window !== 'undefined') {
        localStorage.setItem('comments', JSON.stringify(state.comments)); // Save updated comments to localStorage
      }
    },
  },
});

// Exporting actions to be used in components
export const { setComments, deleteComment, incrementLikes, filterCommentsByUser, addComment } = commentsSlice.actions;
export default commentsSlice.reducer; // Exporting the reducer to be used in the store
