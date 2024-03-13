// @ts-check
import { test, expect } from '@playwright/test';
import { loadHomePage, assertTitle } from '../helpers';


test.only('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  const pageElement = await page.locator('h3');
  await expect(pageElement).toContainText("Any browser • Any platform • One API");
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Selectors //

// test('Selectors', async ({page}) => {
//   //text
//   await page.click('text=some text');

//   //CSS 
//   await page.click('button');
//   await page.click('#id');
//   await page.click('.class');

//   //Only visible CSS selectors
//   await page.click('.sumbit-button:visible');

//   //Combinations
//   await page.click('#first .second');

//   //XPath
//   await page.click('//button')
// })

// Inputs //

test.describe('My first test suite', () => {
  test.skip('Working with input', async({page}) => {
    await page.goto('https://playwright.dev/') // go to a link
  
    await page.click('#sumbit-button') // get id of input
  
    await page.fill('#id' , 'some text'); // write a text in input
  
    //Error message
    const ErrorMessage = await page.locator('.alert-error');
    await expect(ErrorMessage).toContainText('a mesage with error')
  
    //Text input
  await page.getByRole('textbox').fill('Peter');
  
    //Date input
  await page.getByLabel('Birth date').fill('2020-02-02');
  
    //Time input
  await page.getByLabel('Appointment time').fill('13:15');
  
    //Local datetime input
  await page.getByLabel('Local time').fill('2020-03-02T05:15');
  });
  
  //Asertions //
  test('Assertions @myTag', async({page}) =>{
    await page.goto('https://example.com/');
    await expect(page).toHaveURL('https://example.com/');
    await expect(page).toHaveTitle('Example Domain');
  
    const element = await page.locator('h1');
  
    await expect(element).toBeVisible();
    await expect(element).toHaveText('Example Domain');
    await expect(element).toHaveCount(1);
  
    const nonExistingElement = await page.locator('h5');
      await expect(nonExistingElement).not.toBeVisible();
  
  })
})

test.describe('Hooks', () => {
  test.beforeEach(async({page}) => {
    await page.goto('https://example.com/');
  })
  test("Screenshot", async({page}) => {
    //wait page.goto('https://example.com/');
    await page.screenshot({path: 'screenshot.png', fullPage: true});
  })
  
  // test.only('Single element screenshot', async({page}) => {
  //   await page.goto('https://example.com/');
  //   const element = await page.$('h1');
  //   await element.screenshot({path: 'secondary-screenshot.png' });
  // })
})

test('await Helpers', async({page}) => {
  await loadHomePage(page);
  await page.pause();
  await assertTitle(page);
})