import { HomePage } from '@page-objects/HomePage';
import { Page, expect, test } from '@playwright/test';
import { getRandomString, lockedUserLogin, standardUserLogin, validPassword } from '@utils/data-helpers/data-helpers';

test.describe('Home page tests', () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    //Load homepage
    await homePage.loadHomePage();
  });

  test('Verify empty login form', async ({ page }) => {
    await homePage.loginButton.click();
    expect(homePage.errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('Verify empty username field', async ({ page }) => {
    const randomPassword = await getRandomString();
    await homePage.fillLoginForm('', `${randomPassword}`);
    await homePage.loginButton.click();
    expect(homePage.errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('Verify empty password field', async ({ page }) => {
    const userLogin = await standardUserLogin;
    await homePage.fillLoginForm(`${userLogin}`, '');
    await homePage.loginButton.click();
    expect(homePage.errorMessage).toContainText('Epic sadface: Password is required');
  });

  test('Verify standard user login', async ({ page }) => {
    const userLogin = await standardUserLogin;
    const userPassword = await validPassword;
    await homePage.fillLoginForm(`${userLogin}`, `${userPassword}`);
    await homePage.loginButton.click();
    expect(page).toHaveURL('/inventory.html');
  });

  test('Verify locked out user login', async ({ page }) => {
    const userLogin = await lockedUserLogin;
    const userPassword = await validPassword;
    await homePage.fillLoginForm(`${userLogin}`, `${userPassword}`);
    await homePage.loginButton.click();
    expect(homePage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
