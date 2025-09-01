import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('drag and drop to element', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    
    await page.goto("https://jqueryui.com/resources/demos/droppable/default.html");

    //drag and drop-> only element to element, not file to element

    //single command:
    // await page.locator("#draggable").dragTo(page.locator("#droppable"));

    //multiple commands:
    await page.locator("#draggable").hover();
    await page.mouse.down();
    await page.locator("#droppable").hover();
    await page.mouse.up();
    
    await page.waitForTimeout(3000);

});
