// models/Comment.ts
export interface Comment {
  id: number;
  body?: string;
  user: {
    username?: string;
    fullName?: string;
  };
  likes: number;
}
