const { test, expect } = require('@playwright/test');


// Playwright basics
test('Wonder Proxy home page title', async ({ page }) => {
  await page.goto('https://wonderproxy.com');
  expect(await page.title()).toBe('Localization testing with confidence - WonderProxy');
});

test('Wonder Proxy status page title', async ({ page }) => {
  await page.goto('https://wonderproxy.com/servers/status');
  expect(await page.title()).toBe('Server Status - WonderProxy');
});

// Check server status:
const serverNames = ['Lansing', 'Nuremberg', 'Koto'];
for (const serverName of serverNames) {
  test(`Server status for ${serverName} is "up"`, async ({page}) => {
    await page.goto('https://wonderproxy.com/servers/status');

    // wait for the list to be selectable
    const statusListSelector = '#status > div.has-shadow > ul > li';
    await page.waitForSelector(statusListSelector);

    // evaluate list of server status and turn it into an array of name and status
    const statusList = await page.evaluate((selector) => {
      // This is evaluated in the context of the browser which allows cool tricks but can be confusing.
      const statusElements = Array.from(document.querySelectorAll(selector));
      return statusElements.map(statusElement => {
        const name = statusElement.querySelector('span.title.is-block > a').textContent;
        const status = statusElement.querySelector('span.server-status.is-up').textContent;
        return {name, status};
      });
    }, statusListSelector);

    const status = statusList.find(s => s.name === serverName).status;
    expect(status).toBe('up');
  });
}


// Wonder Proxy and Puppeteer integration: Google.com world tour
const locations = [
  { location: 'Lansing', server: 'lansing.wonderproxy.com', searchButtonText: 'Google Search', luckyButtonText: 'I\'m Feeling Lucky' },
  { location: 'Amsterdam', server: 'amsterdam.wonderproxy.com', searchButtonText: 'Google zoeken', luckyButtonText: 'Ik doe een gok' },
  { location: 'Venice', server: 'venice.wonderproxy.com', searchButtonText: 'Cerca con Google', luckyButtonText: 'Mi sento fortunato' },
  { location: 'Tokyo', server: 'tokyo.wonderproxy.com', searchButtonText: 'Google 検索', luckyButtonText: 'I\'m Feeling Lucky' },
];

for (const location of locations) {
  // Use "test.describe" to isolate "test.use" fixture setups
  test.describe(`Google.com should have location specific information for ${location.location}`, () => {

    // Modify fixture setup with "test.use"
    test.use({
      proxy: {
        server: `http://${location.server}:10000`,
        username: process.env.PROXY_USER,
        password: process.env.PROXY_PASS
      }
    });

    test(`button text`, async ({page}) => {
      await page.goto('https://google.com');

      // wait for the list to be selectable
      const inputSelector = 'input[type="submit"]';
      await page.waitForSelector(inputSelector, {state: "attached"});

      const inputList = await page.evaluate((selector) => {
        // This is evaluated in the context of the browser which allows cool tricks but can be confusing.
        const elements = Array.from(document.querySelectorAll(selector));
        return elements.map(element => element.defaultValue);
      }, inputSelector);

      // This will get better failure messages indicating expected and actual results
      expect(inputList[0]).toBe(location.searchButtonText);
      expect(inputList[1]).toBe(location.luckyButtonText);

      // This is more robust, will not break if the buttons are re-arranged.
      expect(inputList).toContain(location.searchButtonText);
      expect(inputList).toContain(location.luckyButtonText);
    });
  });
}