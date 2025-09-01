// This class represents the home page, handling login and logout actions.
// It follows the Page Object Model (POM) pattern.

import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly myAccountLink: Locator;
    readonly loginLink: Locator;
    readonly logoutLink: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myAccountLink = page.locator('a[title="My Account"]');
        this.loginLink = page.locator('ul.dropdown-menu a:has-text("Login")');
        this.logoutLink = page.locator('ul.dropdown-menu a:has-text("Logout")');
        this.emailInput = page.locator('#input-email');
        this.passwordInput = page.locator('#input-password');
        this.loginButton = page.locator('[value="Login"]');
    }

    // Navigates to the login page.
    async gotoLoginPage() {
        await this.myAccountLink.click();
        await this.loginLink.click();
    }

    // Performs the login action with provided credentials.
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    // Performs the logout action.
    async logout() {
        await this.myAccountLink.click();
        await this.logoutLink.click();
    }
}