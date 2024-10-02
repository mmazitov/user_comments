import { describe, it, expect, beforeEach, vi } from 'vitest';
import commentsReducer, {
  setComments,
  deleteComment,
  incrementLikes,
  filterCommentsByUser,
  addComment,
} from './commentsStore';
import { Comment } from '@/models/comments';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Sample comment data
const sampleComment: Comment = {
  id: 1,
  body: 'Test comment',
  user: { username: 'testuser', fullName: 'Test User' },
  likes: 0,
};

describe('commentsSlice', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set comments correctly', () => {
    const initialState = { comments: [], filteredUser: null };
    const comments = [sampleComment];
    const newState = commentsReducer(initialState, setComments(comments));

    expect(newState.comments).toEqual(comments);
    expect(localStorage.getItem('comments')).toEqual(JSON.stringify(comments));
  });

  it('should delete a comment', () => {
    const initialState = { comments: [sampleComment], filteredUser: null };
    const newState = commentsReducer(initialState, deleteComment(1));

    expect(newState.comments).toEqual([]);
    expect(localStorage.getItem('comments')).toEqual(JSON.stringify([]));
  });

  it('should increment likes for a comment', () => {
    const initialState = { comments: [sampleComment], filteredUser: null };
    const newState = commentsReducer(initialState, incrementLikes(1));

    expect(newState.comments[0].likes).toBe(1);
    expect(localStorage.getItem('comments')).toEqual(
      JSON.stringify([{ ...sampleComment, likes: 1 }])
    );
  });

  it('should filter comments by user', () => {
    const initialState = { comments: [], filteredUser: null };
    const newState = commentsReducer(initialState, filterCommentsByUser('testuser'));

    expect(newState.filteredUser).toBe('testuser');
  });

  it('should add a comment', () => {
    const initialState = { comments: [], filteredUser: null };
    const newComment = { ...sampleComment, id: 2 };
    const newState = commentsReducer(initialState, addComment(newComment));

    expect(newState.comments[0]).toEqual(newComment);
    expect(localStorage.getItem('comments')).toEqual(JSON.stringify([newComment]));
  });
});
