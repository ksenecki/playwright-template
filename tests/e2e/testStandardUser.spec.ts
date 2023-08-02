import { HomePage } from '@page-objects/HomePage';
import { InventoryPage } from '@page-objects/InventoryPage';
import { Page, expect, test } from '@playwright/test';
import { getRandomString, lockedUserLogin, standardUserLogin, validPassword } from '@utils/data-helpers/data-helpers';

test.describe('Inventory page tests', () => {
  let homePage: HomePage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    inventoryPage = new InventoryPage(page);
    //Load homepage
    await homePage.loadHomePage();

    //Login as Standard User
    const userLogin = await standardUserLogin;
    const userPassword = await validPassword;
    await homePage.fillLoginForm(`${userLogin}`, `${userPassword}`);
    await homePage.loginButton.click();
    expect(page).toHaveURL('/inventory.html');
  });

  test('Verify bm button opens menu', async ({ page }) => {
    await inventoryPage.burgerMenuButton.click();
    expect(inventoryPage.burgerMenuContainer).toBeVisible();
  });

  test('Verify logout button', async ({ page }) => {
    await inventoryPage.burgerMenuButton.click();
    await inventoryPage.logoutButton.click();
    expect(page).toHaveURL('/');
  });
});
