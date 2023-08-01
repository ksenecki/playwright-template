import { Locator, Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly siteTitle: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteTitle = page.locator('.login_logo');
    this.loginButton = page.locator('.submit-button');
    this.errorMessage = page.locator('data-test=error');
    this.usernameInput = page.locator('data-test=username');
    this.passwordInput = page.locator('data-test=password');
  }

  async loadHomePage() {
    const pageTitle = await this.siteTitle;
    await this.page.goto('/');
    await expect(pageTitle).toContainText('Swag Labs');
  }

  async fillLoginForm(login: string, password: string) {
    await this.usernameInput.fill(login);
    await this.passwordInput.fill(password);
  }
}
