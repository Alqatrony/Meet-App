import puppeteer from 'puppeteer';
import { mockData } from "../mock-data";

describe('show/hide an event details', () => {
    jest.setTimeout(30000);
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
           ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

     /* -------------------------------------------------------------------
            FEATURE 1: FILTER EVENTS BY CITY
    ---------------------------------------------------------------------*/

    test('When user hasnt searched for a city, show upcoming events from all cities.', async () => {
      // $$ =^= document.querySelectorAll
      const events = (await page.$$('.event')).length;
      expect(events).toBe(mockData.length);
    });
    
    test('User should see a list of suggestions when they search for a city.', async () => {
      await page.type('.city', 'London, UK', { delay: 200 });
      let suggestions = await page.$$('.suggestions li');
      console.log(suggestions);
      expect(suggestions).toHaveLength(2);
    });

    test('User can select a city from the suggested list.', async () => {
        await page.reload();
        await page.type('.city', 'London, UK', { delay: 200 });
        let eventsFiltered = mockData.filter((e) => e.location === 'London, UK');
        await page.click('.suggestions-item');
        const events = (await page.$$('.event')).length;
        expect(events).toBe(eventsFiltered.length);
    });

  /* -------------------------------------------------------------------
            FEATURE 2: SHOW / HIDE AN EVENT'S DETAILS
    ---------------------------------------------------------------------*/

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });
    
    test('User can expand an event to see its details', async () => {
        await page.click('.btn-toggle-details');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeDefined();
    });
    
    test('User can collapse an event to hide its details', async () => {
        await page.click('.btn-toggle-details');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
      });
});