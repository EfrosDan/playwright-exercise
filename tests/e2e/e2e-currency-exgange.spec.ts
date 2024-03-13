import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import {LoginPage} from '../../page-objects/LoginPage'

test.describe('Currency Exchange Form', () => {
  let homePage : HomePage
  let loginPage : LoginPage
    //Login
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    homePage.visit()    
    homePage.ClickOnSingIn()
    loginPage.login('username', 'password')
  
  })
  //Make an currency exchange 
  test('Should make currency exchange', async ({ page }) => {
    await page.click('#pay_bills_tab') // eroare - alt id trebuie sa fie
    await page.click('text=Purchase Foreign Currency')
    await page.selectOption('#pc_currency', 'EUR') // select option EUR

    const rate = await page.locator('#sp_sell_rate')
    await expect(rate).toContainText('1 euro (EUR)') // expect to have text - 1 euro (EUR)

    await page.fill('#pc_amount', '1000') // fill input with 1000
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')

    const conversionAmount = await page.locator('#pc_conversion_amount')
    await expect(conversionAmount).toContainText('1000.00 U.S. dollar (USD)')

    await page.click('#purchase_cash')

    const message = await page.locator('#alert_content')
    await expect(message).toBeVisible() // should alert message to be visible
    await expect(message).toContainText(
      'Foreign currency cash was successfully purchased'
    )
  })
})
