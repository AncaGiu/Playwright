import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('type characters sequentially', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    
    await page.goto("https://www.flipkart.com");

    
    // page.getByPlaceholder('Search for Products, Brands and More').pressSequentially("macbook"); //Types instantly
    page.getByPlaceholder('Search for Products, Brands and More').pressSequentially("macbook", {delay : 500}); //types slower, like an user

    await page.waitForTimeout(6000);

});