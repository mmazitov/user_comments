// commentsStore.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Comment } from '@/models/comments';

interface CommentsState {
  comments: Comment[];
  filteredUser: string | null;
}

const loadCommentsFromLocalStorage = (): Comment[] => {
  const savedComments = localStorage.getItem('comments');
  return savedComments ? JSON.parse(savedComments) : [];
};

const initialState: CommentsState = {
  comments: loadCommentsFromLocalStorage(), // Загружаем комментарии из localStorage
  filteredUser: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      localStorage.setItem('comments', JSON.stringify(state.comments)); // Сохраняем в localStorage
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      localStorage.setItem('comments', JSON.stringify(state.comments)); // Обновляем в localStorage
    },
    incrementLikes: (state, action: PayloadAction<number>) => {
      const comment = state.comments.find((comment) => comment.id === action.payload);
      if (comment) {
        comment.likes += 1;
        localStorage.setItem('comments', JSON.stringify(state.comments)); // Обновляем в localStorage
      }
    },
    filterCommentsByUser: (state, action: PayloadAction<string | null>) => {
      state.filteredUser = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
      localStorage.setItem('comments', JSON.stringify(state.comments)); // Сохраняем в localStorage
    },
  },
});

export const { setComments, deleteComment, incrementLikes, filterCommentsByUser, addComment } = commentsSlice.actions;
export default commentsSlice.reducer;