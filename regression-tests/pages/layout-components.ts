import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class Header extends BasePage {
  readonly header: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.header = this.page.locator('header').first();
  }
}

export class MainMenu extends BasePage {
  readonly menu: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.menu = this.page.locator('nav[class*="MuiList-root"]');
  }
}
