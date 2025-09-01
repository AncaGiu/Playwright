import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('browser context', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});

    //browser context 1
    const browserContext_1:BrowserContext = await browser.newContext();
    const page1:Page = await browserContext_1.newPage();

    //browser context 2
    const browserContext_2:BrowserContext = await browser.newContext();
    const page2:Page = await browserContext_2.newPage();

    //browser1:
    await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    const emailId1:Locator = page1.locator('#input-email');
    const password1:Locator = page1.locator('#input-password');
    const loginButton1:Locator = page1.locator('[value="Login"]');

    await emailId1.fill("pwtest_1@opencart.com");
    await password1.fill("playwright@123");
    await loginButton1.click();

    //browser2:
    await page2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    const emailId2:Locator = page2.locator('#input-email');
    const password2:Locator = page2.locator('#input-password');
    const loginButton2:Locator = page2.locator('[value="Login"]');

    await emailId2.fill("pwtest_2@opencart.com");
    await password2.fill("playwright@123");
    await loginButton2.click();

    // await browserContext_1.close();
    // await browserContext_2.close();
    // await browser.close();

   await new Promise(() => {}); //prevents your script from exiting

});