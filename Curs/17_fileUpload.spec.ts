import {test, expect, Browser, Page, Locator} from '@playwright/test'
import {webkit, chromium, firefox} from 'playwright'
import path from 'path';

test('file upload', async()=>{
    const browser:Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await browser.newPage();
   
    // //single file upload:
    // await page.goto("https://cgi-lib.berkeley.edu/ex/fup.html"); //url cannot be accessed
    // await page.locator('input[name="upfile"]').setInputFiles("local_path/file_name");

    // //deselect files:
    // await page.locator('input[name="upfile"]').setInputFiles([]);

    //multiple files upload: it can be used for single file too
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    await page.locator('input[name="filesToUpload"]')
        .setInputFiles([
            path.join("C:/Users/ancag/Downloads/poza CV.jpg"),
            path.join("C:/Users/ancag/Downloads/CV_Anca_Giurgia.pdf")
        ]);
    await page.waitForTimeout(3000);

    //deselect files:
    await page.locator('input[name="filesToUpload"]').setInputFiles([]);

    await page.waitForTimeout(3000);

    //upload file from buffer memory(create file)
    await page.locator('input[name="filesToUpload"]').setInputFiles({
        name: 'anca_test.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('this is anca resume')
    });

    await page.waitForTimeout(3000);
});
