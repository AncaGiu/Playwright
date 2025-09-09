import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'

test('login test', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register");

    const firstName:Locator = page.locator('#input-firstname');
    const lastName:Locator = page.locator('#input-lastname');
    const email:Locator = page.locator('#input-email');
    const telephone:Locator = page.locator('#input-telephone');
    const password:Locator = page.locator('#input-password');
    const confirmPassword:Locator = page.locator('#input-confirm');

    const privacy:Locator = page.locator('[name="agree"]');
    const continueButton:Locator = page.locator('[value="Continue"]');

    await firstName.fill("Anca");
    await lastName.fill("Giu");
    await email.fill("pwtest_1@opencart.com");
    await telephone.fill("12345678");
    await password.fill("playwright@123");
    await confirmPassword.fill("playwright@123");

    await privacy.check();
    await continueButton.click();

    const title = await page.title();
    console.log("register successfuly page title: ", title);
    await page.screenshot({path: 'homepage.png'});

    expect(title).toEqual("Your Account Has Been Created!");
    
    await browser.close();


});