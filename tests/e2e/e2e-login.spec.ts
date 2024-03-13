import {test, expect} from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe.parallel.only('Login / Logout Flow' , () => {
    let loginPage : LoginPage
    let homePage : HomePage

    test.beforeEach(async({page}) => {
        loginPage =  new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
        // await page.goto('http://zero.webappsecurity.com');
    })

    //Negative Scenario
    test('Negative Scenario for Login', async({page}) => {
       //await page.click('#signin_button')
       await homePage.ClickOnSingIn()
    //    await page.fill('#user_login', 'invalid username');
    //    await page.fill('#user_password', 'invalid password');
    //     await page.click('text=Sign in');

    await loginPage.login('invalid username', ' invalid password')
    await loginPage.wait(200)
        await loginPage.assertErrorMesage();
        // const errorMessage = await page.locator('.alert-error');
        // await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    //Positive Scenarie + Logout
    test('Positive Scenario for Login + logout', async({page}) => {
        //await page.click('#signin_button')
        await homePage.ClickOnSingIn();
        // await page.fill('#user_login', 'username');
        // await page.fill('#user_password', 'password');
        // await page.click('text=Sign in');

        await loginPage.login('username', 'password')

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})