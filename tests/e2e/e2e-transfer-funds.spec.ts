import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'

test.describe('Transfer Funds and Make Payments', () => {
  let homePage : HomePage
  let loginPage : LoginPage

    //LOGIN
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

  test('Transfer funds', async ({ page }) => {
    await page.click('#transfer_funds_tab')
    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.fill('#tf_amount', '500')
    await page.fill('#tf_description', 'Test message')
    await page.click('#btn_submit')

    const boardHeader = await page.locator('h2.board-header')
    await expect(boardHeader).toContainText('Verify')
    await page.click('#btn_submit')

    const message = await page.locator('.alert-success')
    await expect(message).toContainText(
      'You successfully submitted your transaction'
    )
  })
})
