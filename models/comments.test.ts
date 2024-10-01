// tests/Comment.test.ts
import { describe, expect, it } from 'vitest';

import { Comment } from '@/models/comments'; // Ensure this path is correct

describe('Comment Model', () => {
  it('should conform to the Comment interface structure', () => {
    // Create a mock comment object
    const mockComment: Comment = {
      id: 1,
      body: 'This is a comment.',
      user: {
        username: 'user123',
        fullName: 'User Name',
      },
      likes: 10,
    };

    // Check if the object has the correct properties
    expect(mockComment).toHaveProperty('id');
    expect(mockComment).toHaveProperty('body');
    expect(mockComment).toHaveProperty('user');
    expect(mockComment).toHaveProperty('likes');

    // Check types of the properties
    expect(typeof mockComment.id).toBe('number');
    expect(typeof mockComment.body).toBe('string'); // body can be undefined, but if present, it should be a string
    expect(typeof mockComment.user).toBe('object');
    expect(typeof mockComment.likes).toBe('number');

    // Check user properties
    expect(mockComment.user).toHaveProperty('username');
    expect(mockComment.user).toHaveProperty('fullName');
    expect(typeof mockComment.user.username).toBe('string'); // username can be undefined
    expect(typeof mockComment.user.fullName).toBe('string'); // fullName can be undefined
  });
});
