import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'

test.describe('New Payment', () => {
  let homePage : HomePage
  let loginPage : LoginPage

    //Login
  test.beforeEach(async ({ page }) => {
    await homePage.visit()
    //await page.goto('http://zero.webappsecurity.com/index.html')
    
    await homePage.ClickOnSingIn()
    //await page.click('#signin_button')
    
    await loginPage.login('username', 'password')
    //await page.fill('#user_login', 'username')
    //await page.fill('#user_password', 'password')
    //await page.click('text=Sign in')
  })
  // Take an payment
  test('Should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details')
    await page.selectOption('#sp_account', '6')
    await page.fill('#sp_amount', '5000')
    await page.fill('#sp_date', '2021-11-09')
    await page.fill('#sp_description', 'some random message')
    await page.click('#pay_saved_payees')

    const message = await page.locator('#alert_content > span')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'The payment was successfully submitted'
    )
  })
})
