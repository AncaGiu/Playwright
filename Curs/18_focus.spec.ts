import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('focus element test', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    await page.goto("https://www.orangehrm.com/30-day-free-trial/");

    const fullName = page.locator('#Form_getForm_Name');
    fullName.focus();
    fullName.fill("testing automation");
    

    await page.waitForTimeout(5000);
});
