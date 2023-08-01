import { expect, test } from '@playwright/test';
import { ApiHelper } from '@utils/api-helpers/api.helper';
import { Users } from '@utils/api-helpers/users.api';

test.describe('Users API Tests', () => {
  let responseGetAllUsers: { statusCode: number; body: string | any[] }, responseData;
  let emptyArray: string[] = [];
  test.beforeEach(async () => {
    //GET all users
    responseGetAllUsers = await Users.getAllUsers();
  });

  test('Get all users', async () => {
    //Status code
    expect(await responseGetAllUsers.statusCode).toEqual(200);

    //Users count
    expect(await responseGetAllUsers.body.length).toBe(10);
  });

  test('Verify phone number', async () => {
    //Phone number shouldn't be null
    for (let index = 0; index < responseGetAllUsers.body.length; index++) {
      responseData = responseGetAllUsers.body[index].phone;
      emptyArray.push(responseData);
      expect(responseData).not.toBe(null);
    }

    //Count phone numbers
    expect(emptyArray.length).toBe(10);
  });

  test('Verify catch phrase', async () => {
    //Look for the users with the same catch phrase
    for (let index = 0; index < responseGetAllUsers.body.length; index++) {
      responseData = responseGetAllUsers.body[index].company.catchPhrase;
      emptyArray.push(responseData);
      expect(responseData).not.toBe(null);
    }

    //Return duplicated catch phrases
    const duplicateFound = ApiHelper.findDuplicates(responseGetAllUsers.body.length, emptyArray);
    expect((await duplicateFound).length).toBe(0);
  });
});
