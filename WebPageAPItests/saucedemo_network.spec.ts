//prints every network request and response while it runs through the SauceDemo flow (login → add to cart → checkout).

import { test, expect } from '@playwright/test';

test('log all network requests during SauceDemo flow', async ({ page }) => {
  // Log all outgoing requests
  page.on('request', req => {
    console.log('>>', req.method(), req.url());
  });

  // Log all incoming responses
  page.on('response', async res => {
    console.log('<<', res.status(), res.url());
    try {
      if (res.request().resourceType() === 'xhr' || res.request().resourceType() === 'fetch') {
        const body = await res.text();
        console.log('Response body snippet:', body.substring(0, 200)); // first 200 chars
      }
    } catch (err) {
      console.log('Could not read response body:', err);
    }
  });

  // Start the test flow
  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);
  await page.waitForTimeout(2000);

  // Add products
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  await page.waitForTimeout(2000);
  

  // Go to cart
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);
  await page.waitForTimeout(2000);

  // Checkout
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.waitForTimeout(2000);
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');
  await expect(page).toHaveURL(/checkout-complete.html/);
  await page.waitForTimeout(2000);
});
