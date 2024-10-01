import { describe, expect, it, vi } from 'vitest';

import { fetchComments } from './comments';

describe('fetchComments', () => {
	it('should fetch comments and return them as an array', async () => {
		// Подмена ответа fetch
		const mockComments = [
			{
				id: 1,
				body: 'This is a comment.',
				user: {
					username: 'user1',
					fullName: 'User One',
				},
				likes: 0,
			},
			{
				id: 2,
				body: 'This is another comment.',
				user: {
					username: 'user2',
					fullName: 'User Two',
				},
				likes: 5,
			},
		];

		// Mock функции fetch
		global.fetch = vi.fn().mockResolvedValue({
			json: vi.fn().mockResolvedValue({ comments: mockComments }),
		});

		const comments = await fetchComments();

		expect(comments).toEqual(mockComments);
		expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/comments');
	});

	it('should handle fetch errors', async () => {
		// Mock функции fetch для генерации ошибки
		global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

		await expect(fetchComments()).rejects.toThrow('Network error');
	});
});
