import {test, expect, Browser, Page, Locator, BrowserContext} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('No Incognito test', async()=>{
    // const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const browser:BrowserContext = await chromium.launchPersistentContext('',{headless: false, channel: 'chrome'}); 
    // const browser:BrowserContext = await chromium.launchPersistentContext('./session',{headless: false, channel: 'chrome'}); 

    const pages = browser.pages(); //returnas an array with 2 elements: 0 to 1
    const page:Page = pages[0];

    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    const firstName:Locator = page.locator('id=input-firstname');
    const lastName:Locator = page.locator('id=input-lastname');

    await firstName.fill("Anca");
    await lastName.fill("Giu");

    await page.waitForTimeout(5000);

});