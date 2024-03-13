import { expect, Locator, Page } from "@playwright/test";

export class FeedbackPage {
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly clearButton: Locator
    readonly sumbitButton: Locator
    readonly feedbackTitle: Locator

    constructor(page : Page){
        this.page = page
        this.nameInput = page.locator('#name')
        this.emailInput = page.locator('#email')
        this.subjectInput = page.locator('#subject')
        this.commentInput = page.locator('#comment')
        this.clearButton = page.locator("input[name='clear']")
        this.sumbitButton = page.locator("input[type='submit']")
        this.feedbackTitle = page.locator('#feedback-title')
    }

    async FillForm(name: string , email: string, subject: string, comment: string){
        await this.nameInput.fill(name)
        await this.commentInput.fill(email)
        await this.subjectInput.fill(subject)
        await this.commentInput.fill(comment)
    }

    async ClearForm() {
        await this.clearButton.click()
    }
    async SumbitForm() {
        await this.sumbitButton.click()
    }
    async assertForm(){
        await expect(this.nameInput).toBeEmpty
        await expect(this.commentInput).toBeEmpty
    }
    async FeedbackFormSent(){
        await expect(this.feedbackTitle).toBeVisible
    }
}