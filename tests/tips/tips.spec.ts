import {test, expect} from '@playwright/test'
import { getRandomNumber, getRandomString } from '../utils/data-helpers'

test.describe("Tips and Tricks Section", () => {
    test.only('Test info Object', async ({page} , testInfo ) => {
        await page.goto('https://www.example.com')
        //console.log(testInfo.title)
        let newNumber = await getRandomNumber();
        let newString = await getRandomString();
        console.log(newNumber)
        console.log(newString)
    })

    test('Test Skip Browser', async ({page, browserName}) => {
        test.skip(browserName === 'chromium', ' a message for developer')
        await page.goto('https://www.example.com')
    })

    test.only('Test Fixme Annotation ', async ({page, browserName}) => {
        //test.fixme(browserName === 'chromium', 'Test is no stable, need revision')
        await page.goto('https://www.example.com')
    })
})