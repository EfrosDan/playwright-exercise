import { test, expect } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { HomePage } from '../../page-objects/HomePage'


test.describe('Feedback Form', () => {
  let feedbackPage : FeedbackPage
  let homePage : HomePage
    //Login
  test.beforeEach(async ({ page }) => {
    feedbackPage = new FeedbackPage(page)
    homePage = new HomePage(page)
    
   await homePage.visit()
   await homePage.ClickonFeedbackLink()
    })

  // Reset feedback form
  test('Reset feedback form', async ({ page }) => {
   await feedbackPage.FillForm('name', 'email@email.com',' subject', 'some nice comment about the application')
    await feedbackPage.ClearForm()

    await feedbackPage.assertForm()
  })

  // Submit feedback form
  test('Submit feedback form', async ({ page }) => {
    await feedbackPage.FillForm('name', 'email@email.com',' subject', 'some nice comment about the application')
    await feedbackPage.SumbitForm()
    await feedbackPage.FeedbackFormSent()
  })
})
