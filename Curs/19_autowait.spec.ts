import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test.use({
    actionTimeout: 10000   //Set the action timeout to 10 seconds for all actions in test
});

test('auto wait check 1', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    // page.setDefaultTimeout(15000);
    // default timeout = 30 seconds

    await page.goto("https://classic.freecrm.com/register/");
    await page.locator('input[name="agreeTerms11"]').check({timeout: 5000});   
    // await page.locator('input[name="agreeTerms11"]').check(); 

});

test('auto wait check 2', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    // page.setDefaultTimeout(15000);
    // default timeout = 30 seconds

    await page.goto("https://classic.freecrm.com/register/");
    await page.locator('input[name="agreeTerms11"]').check();    

});

test('auto wait check 3', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    // page.setDefaultTimeout(15000);
    // default timeout = 30 seconds

    await page.goto("https://classic.freecrm.com/register/");
    await page.locator('input[name="agreeTerms11"]').check();    

});
