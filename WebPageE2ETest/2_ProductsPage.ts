import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    // Adds a product to the cart by its name.
    async addProductToCart(productName: string) {
        // Playwright's `getByText` is great for finding elements with specific text.
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });
        await product.getByRole('button', { name: /add to cart/i }).click(); 
        //Semnul /i de la sfârșitul căutării face ca aceasta să fie case-insensitive

    }

    // Returns the number of items in the cart.
    async getCartCount() {
        return this.cartBadge.textContent();
    }

    // Navigates to the cart page.
    async gotoCart() {
        await this.cartLink.click();
    }
}