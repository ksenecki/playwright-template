import { Locator, Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly siteTitle: Locator;
  readonly burgerMenuButton: Locator;
  readonly burgerMenuContainer: Locator;
  readonly allItemsButton: Locator;
  readonly aboutButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.siteTitle = page.locator('.app_logo');
    this.burgerMenuButton = page.locator('.bm-burger-button');
    this.burgerMenuContainer = page.locator('.bm-menu');
    this.allItemsButton = page.locator('#inventory_sidebar_link');
    this.aboutButton = page.locator('#about_sidebar_link');
    this.logoutButton = page.locator('#logout_sidebar_link');
  }
}
