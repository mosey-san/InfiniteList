import { TPostItem } from '../UI/PostItem';

type DummyJsonResponse = {
  posts: TPostItem[];
  total: number;
  skip: number;
  limit: number;
};

export const PostServise = Object.freeze({
  async get(limit: number, skip: number) {
    const response = await fetch(
      `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`
    );

    const data: DummyJsonResponse = await response.json();

    return data.posts;
  },
});
