import { test as setup } from '@playwright/test';
import user from '../.auth/user.json'
import fs from 'fs'
//fs = file sync -JS library to work with files (write, update files etc)

const authFile = '.auth/user.json'

setup('authentication', async({request}) => {
    // //login from User Interface
    // await page.goto('https://conduit.bondaracademy.com/')
    // await page.getByText('Sign in').click()
    // await page.getByRole('textbox', {name: "Email"}).fill('anca123@gmail.com')
    // await page.getByRole('textbox', {name: "Password"}).fill('anca_123')    
    // await page.getByRole('button').click()
    // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // //a setup step to log in once and save the authentication state (.auth/user.json).
    // //Later, in your real tests, you can reuse that state with this command:
    // //test.use({ storageState: '.auth/user.json' });  ->now it is set in playwright.config.ts at projects
    // await page.context().storageState({path: authFile})

    //perform a POST request to login and get from the response the corresponding access Token
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user":{"email":"anca123@gmail.com","password":"anca_123"}
        }
    })
    const responseBody = await response.json()
    console.log(responseBody)
    const accessToken = responseBody.user.token
    //we set into the file user.json the above value token:
    user.origins[0].localStorage[0].value = accessToken
    //we write into the file the data above:
    fs.writeFileSync(authFile, JSON.stringify(user))
    //we set the accessToken as environment variable, and we set it in playwright.config.ts 
    process.env['ACCESS_TOKEN'] = accessToken   
})