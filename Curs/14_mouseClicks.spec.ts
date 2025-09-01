import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('mouse click events', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    
    await page.goto("https://www.demo.guru99.com/test/simple_context_menu.html");

    //double click:
    await page.getByText('Double-Click Me To See Alert').dblclick();
    await page.waitForTimeout(3000);

    //right click = context click:
    await page.getByText('right click me').click({button : 'right'});
    await page.waitForTimeout(3000);

    //shift + click ->opens a new window
    await page.goto('https://the-internet.herokuapp.com/shifting_content');
    await page.getByText('Example 1: Menu Element').click({ modifiers: ['Shift'] });
    await page.waitForTimeout(3000);

    //mouse hover:
    await page.goto("https://www.spicejet.com");
    page.getByText('Add-ons').first().hover();
    page.getByText('Visa Services').first().click();
    await page.waitForTimeout(3000);

    browser.close();

});