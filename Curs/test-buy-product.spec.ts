// This is the main test file that orchestrates the end-to-end flow.

import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage';
import { ProductsPage } from './ProductsPage';

test('End-to-end test: login, search, buy and logout', async ({ page }) => {
    // Navigate to the base URL
    await page.goto("https://naveenautomationlabs.com/opencart/");

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    // Step 1: Login
    await test.step('Login to the application', async () => {
        await homePage.gotoLoginPage();
        await homePage.login('pwtest_1@opencart.com', 'playwright@123');
        await expect(page).toHaveTitle('My Account');
    });

    // Step 2: Search for a product
    await test.step('Search for a product', async () => {
        await productsPage.searchForProduct('iPhone');
        await expect(page).toHaveTitle(/Search - iPhone/);
    });

    // Step 3: Add product to cart
    await test.step('Add product to cart', async () => {
        await productsPage.clickProduct();
        await expect(page).toHaveTitle('iPhone');
        await productsPage.addToCart();
        // Verify a success message is displayed.
        await expect(page.locator('.alert-success')).toContainText('Success: You have added iPhone to your shopping cart!');
    });

    // Step 4: Complete checkout and confirm order
    await test.step('Complete checkout and confirm order', async () => {
        await productsPage.proceedToCheckout();
        await expect(page).toHaveTitle('Checkout');
        await productsPage.confirmOrder();
        // Verify the order has been placed.
        await expect(page).toHaveTitle('Your Order Has Been Placed!');
        await expect(page.locator('#content h1')).toHaveText('Your Order Has Been Placed!');
    });

    // Step 5: Logout
    await test.step('Logout from the application', async () => {
        await homePage.logout();
        await expect(page).toHaveTitle('Account Logout');
        await expect(page.locator('#content h1')).toHaveText('Account Logout');
    });
});
