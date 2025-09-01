// This class represents the product search and purchase flow.
// It follows the Page Object Model (POM) pattern.

import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly productLink: Locator;
    readonly addToCartButton: Locator;
    readonly shoppingCartLink: Locator;
    readonly checkoutButton: Locator;
    readonly continueButton: Locator;
    readonly termsAndConditionsCheckbox: Locator;
    readonly confirmOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#search input');
        this.searchButton = page.locator('#search button');
        this.productLink = page.locator('a:has-text("iPhone")'); // Assuming we search for "iPhone"
        this.addToCartButton = page.locator('text="Add to Cart"');
        this.shoppingCartLink = page.locator('#cart-total');
        this.checkoutButton = page.locator('a:has-text("Checkout")');
        this.continueButton = page.locator('#button-payment-address, #button-shipping-address, #button-shipping-method, #button-payment-method').last();
        this.termsAndConditionsCheckbox = page.locator('input[name="agree"]');
        this.confirmOrderButton = page.locator('#button-confirm');
    }

    // Searches for a product.
    async searchForProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    // Clicks on the product link to go to the product page.
    async clickProduct() {
        await this.productLink.click();
    }

    // Adds the product to the cart.
    async addToCart() {
        await this.addToCartButton.click();
    }

    // Proceeds to the checkout page.
    async proceedToCheckout() {
        await this.shoppingCartLink.click();
        await this.page.waitForTimeout(500); // Small delay to wait for the dropdown
        await this.checkoutButton.click();
    }

    // Fills out the checkout form and confirms the order.
    async confirmOrder() {
        // A series of clicks on the 'Continue' button to move through checkout steps
        // The locator finds the last instance of the continue button and clicks it.
        await this.continueButton.click();
        await this.page.waitForTimeout(1000); // Wait for the next step to load
        await this.continueButton.click();
        await this.page.waitForTimeout(1000); // Wait for the next step to load
        await this.continueButton.click();
        await this.page.waitForTimeout(1000); // Wait for the next step to load
        await this.termsAndConditionsCheckbox.check();
        await this.continueButton.click();
        await this.page.waitForTimeout(1000); // Wait for the next step to load
        await this.confirmOrderButton.click();
    }
}