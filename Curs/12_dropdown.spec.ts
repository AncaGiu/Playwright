import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('Select based Drop Down test', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    await page.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");

    const countryDropDown = 'select#Contact_CountryCode';

    // await page.selectOption(countryDropDown, {value: 'AD'});
    // await page.selectOption(countryDropDown, {label: 'Antarctica'});
    // await page.selectOption(countryDropDown, {index: 4}); //index starts to count from 0

    //select#Contact_CountryCode > option
    const allOptions = await page.$$(countryDropDown + ' > option'); //$$ - shows all elements from select menu
    console.log(allOptions.length);
    for (const e of allOptions) {
        const text = await e.textContent();
        console.log(text);
            if (text === 'Romania'){
                await page.selectOption(countryDropDown, { label: text });
                break;
            }
    }

    await page.waitForTimeout(2000);
});