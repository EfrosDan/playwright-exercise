import {expect, Locator, Page} from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
    //Define selectors
    //readonly page: Page
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly sumbitButton: Locator
    readonly errorMessage: Locator
    readonly loginForm : Locator

    //Init selectors using constructor
    constructor(page:Page) {
      //  this.page = page
      super(page)  
      this.userNameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.sumbitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
        this.loginForm = page.locator('#login-form')
    }
    //Define login page methods
   
    async login(username: string, password: string) {
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.sumbitButton.click()
    }
    async assertErrorMesage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.')
    }

    async snapshotLoginForm() {
        await expect(this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
    }
    async snapshotErrorMessage() {
        await expect(this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
    }
}