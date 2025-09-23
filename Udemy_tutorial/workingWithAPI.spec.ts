//creez folder nou -> in terminal rulez: >npm init playwright@latest  -> selectez language TypeScript si restul default
import { test, expect, request } from '@playwright/test';
import tags from './tags.json'

// Force headed mode & Chromium for this file
test.use({ headless: false, browserName: 'chromium' });


test.beforeEach(async ({page}) => {
    //mocking API
    await page.route('*/**/api/tags', async route => {   //we want to make a change in the given API url 
        //Routing provides the capability to modify network requests that are made by a page.

        await route.fulfill({   //we specify the change we want to make-> the body content should contain the tags object 
            body: JSON.stringify(tags) //tags is imported from file tags.json
        })
    })
    
    //login 
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name: "Email"}).fill('anca123@gmail.com')
    await page.getByRole('textbox', {name: "Password"}).fill('anca_123')    
    await page.getByRole('button').click()
})

test('has title', async ({ page }) => {

     //modify API response
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = "This is a MOCK test title"
        responseBody.articles[0].description = "This is a MOCK description"

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })

    await page.waitForTimeout(3000);
    await page.getByText('Global Feed').click()
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title')
    await expect(page.locator('app-article-list p').first()).toContainText('This is a MOCK description')
    await page.waitForTimeout(3000);
});

test('delete article', async({page, request}) => {
    //perform a POST request to login and get from the response the corresponding access Token
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user":{"email":"anca123@gmail.com","password":"anca_123"}
        }
    })
    const responseBody = await response.json()
    console.log(responseBody)
    const accessToken = responseBody.user.token

    //create an article using the obtained login Token, into the POST request
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article":{"title":"this is the title ","description":"this is the article description","body":"this is the article content","tagList":[]}
        },
        headers: {
        Authorization: `Token ${accessToken}`
        }
    })
    expect (articleResponse.status()).toEqual(201)

    //delete the article created with the API request
    await page.getByText('Global Feed').click()
    await page.getByText('this is the title').click()
    await page.getByRole('button', {name: "Delete Article"}).first().click()
    await page.getByText('Global Feed').click()

    await expect(page.locator('app-article-list h1').first()).not.toContainText('this is the title')
})

test('intercept Browser API response', async({page, request}) => {
    //create new article
    await page.getByText('New Article').click()
    await page.getByRole('textbox', {name: 'Article Title'}).fill('Playwright is awesome')
    await page.getByRole('textbox', {name: 'What\'s this article about?'}).fill('Aboutthe Playwright')
    await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('We like to use playwright for automation')
    await page.getByRole('button', {name: 'Publish Article'}).click()
    //save the API Response after creating an article 
    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await articleResponse.json()
    const slugId = articleResponseBody.article.slug

    await expect(page.locator('.article-page h1')).toContainText('Playwright is awesome')
    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()

    await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is awesome')

    //perform a POST request to login and get from the response the corresponding access Token
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user":{"email":"anca123@gmail.com","password":"anca_123"}
        }
    })
    const responseBody = await response.json()
    console.log(responseBody)
    const accessToken = responseBody.user.token

    //delete the article using the slugId from the response
    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })

    expect(deleteArticleResponse.status()).toEqual(204)

})