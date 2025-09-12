import { test, expect } from '@playwright/test';
import { LoginPage } from './1_LoginPage';
import { ProductsPage } from './2_ProductsPage';
import { CartPage } from './3_CartPage';
import { CheckoutPage } from './4_CheckoutPage';

test.describe('Sauce Demo End-to-End Test Suite', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    // Use test.beforeEach to initialize the page objects before each test.
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('should successfully complete an order with a standard user', async ({ page }) => {
        // Action: Navigate and log in
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        // Action: Add products to cart
        await productsPage.addProductToCart('Sauce Labs Backpack');
        await productsPage.addProductToCart('Sauce Labs Fleece Jacket');
        await expect(productsPage.cartBadge).toHaveText('2');
        console.log('Successfully added products to cart.');

        // Action: Navigate to cart and checkout
        await productsPage.gotoCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        // Action: Fill in checkout details
        await checkoutPage.fillShippingDetails('John', 'Doe', '12345');
        await checkoutPage.continueCheckout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        // Action: Finish the order
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        const confirmationMessage = await checkoutPage.getConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your order!');
        console.log('Order completed successfully!');
    });

    test('should show a login error for a locked out user', async ({ page }) => {
        // Action: Navigate and attempt login with a locked user
        await loginPage.goto();
        await loginPage.login('locked_out_user', 'secret_sauce');
        
        // Assert: Verify the error message
        const errorMessage = await loginPage.errorMessage.textContent();
        expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
        console.log('Login failed as expected for a locked user.');
    });
});
