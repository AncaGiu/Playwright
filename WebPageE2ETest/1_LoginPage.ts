import { Page, Locator } from '@playwright/test';

export class LoginPage {
    // We use 'readonly' to make sure the properties can't be reassigned.
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    // Navigates to the login page.
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Fills in login credentials and clicks the login button.
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
