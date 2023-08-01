import { expect, test } from '@playwright/test';
import { ApiHelper } from '@utils/api-helpers/api.helper';
import { PostHelper } from '@utils/api-helpers/data/posts';
import { Posts } from '@utils/api-helpers/posts.api';
import { Users } from '@utils/api-helpers/users.api';

let responseGetSpecificPost: { statusCode: number; body: { id: number; userId: string } },
  responseCreatePost: { statusCode: number; body: { id: number } },
  responseGetAllPosts: { statusCode: number; body: string | any[] },
  responseData,
  responsePostsPerUser: { body: string | any[]; statusCode: number },
  responseCommentsPerPost: { body: string | any[]; statusCode: number };
let emptyArray: string[] = [];

test.describe('GET all posts tests', () => {
  test.beforeEach(async () => {
    //GET all posts
    responseGetAllPosts = await Posts.getAllPosts();
  });

  test('Verify response for GET all posts', async () => {
    //Status code
    expect(await responseGetAllPosts.statusCode).toEqual(200);

    //Posts number
    expect(await responseGetAllPosts.body.length).toBe(100);
  });

  test('Verify specific user posts', async () => {
    //UserId shouldn't be null
    expect(await responseGetAllPosts.body[0].userId).not.toBe(null);

    //Specific user posts count
    responsePostsPerUser = await Users.getAllPostsOnEachUser(responseGetAllPosts.body[0].userId);
    expect(await responsePostsPerUser.body.length).toBe(10);

    //Status code
    expect(await responsePostsPerUser.statusCode).toEqual(200);

    //Response body
    expect(await responsePostsPerUser.body[0].userId).toBe(responseGetAllPosts.body[0].userId);
    expect(await responsePostsPerUser.body[0].id).toEqual(1);
    expect(await responsePostsPerUser.body[0].title).not.toBe(null);
    expect(await responsePostsPerUser.body[0].body).not.toBe(null);
  });

  test('Verify posts with the same name', async () => {
    //Look for posts with the same name
    for (let index = 0; index < responseGetAllPosts.body.length; index++) {
      responseData = responseGetAllPosts.body[index].title;
      emptyArray.push(responseData);
      expect(responseData).not.toBe(null);
    }

    //Return duplicates
    const duplicateFound = ApiHelper.findDuplicates(responseGetAllPosts.body.length, emptyArray);
    expect((await duplicateFound).length).toBe(0);
  });
});

test.describe('GET specific post tests', () => {
  test.beforeEach(async () => {
    //Create a new post
    responseCreatePost = await Posts.createPost(PostHelper.getPostPayload());
    expect(await responseCreatePost.statusCode).toEqual(201);
    expect(await responseCreatePost.body.id).toEqual(101);
  });

  test('Get created post', async () => {
    //replacing the data created by dummy data to achieve the testing
    responseCreatePost.body.id = 1;
    responseGetSpecificPost = await Posts.getPost(responseCreatePost.body.id);

    //Status code
    expect(await responseGetSpecificPost.statusCode).toEqual(200);

    //Response body
    expect(await responseGetSpecificPost.body.id).toBe(responseCreatePost.body.id);
    expect(await responseGetSpecificPost.body.userId).toBe(1);
  });

  test('Get specific post comments', async () => {
    responseGetAllPosts = await Posts.getAllPosts();

    //Get posts by UserId
    responseCommentsPerPost = await Posts.getCommentsOnPosts(responseGetAllPosts.body[0].userId);
    expect(await responseCommentsPerPost.body.length).toBe(5);

    //Status code
    expect(await responseCommentsPerPost.statusCode).toEqual(200);

    //Response body
    expect(await responseCommentsPerPost.body[0].postId).toBe(responseGetAllPosts.body[0].userId);
    expect(await responseCommentsPerPost.body[0].id).toBe(1);
    expect(await responseCommentsPerPost.body[0].name).not.toBe(null);
    expect(await responseCommentsPerPost.body[0].email).not.toBe(null);
    expect(await responseCommentsPerPost.body[0].body).not.toBe(null);
  });
});
