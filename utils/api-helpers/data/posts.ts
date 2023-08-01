import { Post } from '../posts.api';

export class PostHelper {
  static getPostPayload(): Post {
    return {
      title: 'Panda',
      body: 'test message',
      userId: 1,
    };
  }
}
