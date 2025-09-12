import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    // Gets all item names in the cart.
    async getCartItems() {
        return this.page.locator('.inventory_item_name').allTextContents();
    }

    // Clicks the checkout button to start the checkout process.
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
