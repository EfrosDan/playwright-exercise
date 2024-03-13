import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page
    readonly signIn: Locator
    readonly searchItem: Locator
    readonly linkFeedback: Locator


    constructor(page:Page){
        this.page = page
        this.signIn = page.locator('#signin_button')
        this.searchItem = page.locator('#searchTerm')
        this.linkFeedback = page.locator('#feedback')
    }
    async visit() {
        await this.page.goto('http://zero.webappsecurity.com')
    }

    async ClickOnSingIn() {
        await this.signIn.click();
    }

    async SearchFor(phrase: string) {
        await this.searchItem.fill(phrase)
        await this.page.keyboard.press('Enter')
    }
    async ClickonFeedbackLink(){
        await this.linkFeedback.click()
    }
}

