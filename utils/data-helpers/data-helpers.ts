import * as crypto from 'crypto';

export const standardUserLogin = 'standard_user';
export const lockedUserLogin = 'locked_out_user';
export const problemUserLogin = 'problem_user';
export const performanceUserLogin = 'performance_glitch_user';
export const validPassword = 'secret_sauce';
export const wrongLogin = 'panda';
export const wrongPassword = 'wrongpass';

export async function getRandomNumber() {
  return Math.floor(Math.random() * 1000 + 1);
}

export async function getRandomString() {
  return crypto.randomBytes(5).toString('hex');
}
