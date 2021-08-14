// noinspection JSUnusedLocalSymbols
const should = require('chai').should();
const puppeteer = require('puppeteer');

describe('Puppeteer tests', function () {
  this.timeout(20000);  // increase Mocha's default timeout

  describe('WonderProxy website - Puppeteer basics', function () {
    describe('Home Page', function () {
      describe('Title', function () {
        it('should be "Localization testing with confidence - WonderProxy"', async function () {
          const browser = await puppeteer.launch();
          // Use this instead of previous line to turn off headless and slow things down:
          // const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
          const page = await browser.newPage();
          await page.goto('https://wonderproxy.com');
          const title = await page.title();
          await browser.close();
          title.should.equal('Localization testing with confidence - WonderProxy');
        })
      })
    });

    describe('Status Page', function () {
      describe('Title', function () {
        it('should be "Server Status - WonderProxy"', async function () {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto('https://wonderproxy.com/servers/status');
          const title = await page.title();
          await browser.close();

          title.should.equal('Server Status - WonderProxy');
        });
      });

      describe('Server status is up', function () {
        const serverNames = ['Lansing', 'Nuremberg', 'Koto'];
        for (const serverName of serverNames) {
          it(`should show "up" status for ${serverName}`, async function () {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
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

            await browser.close();

            // find the interesting server in the list
            const status = statusList.find(s => s.name === serverName).status;

            // assert status
            status.should.equal('up');
          });
        }
      });
    });
  });

  // Wonder Proxy and Puppeteer integration:
  describe('Google.com world tour', function () {
    // Note: Servers must be added in the WP portal before running the test
    const locations = [
      { location: 'Lansing', server: 'lansing.wonderproxy.com', searchButtonText: 'Google Search', luckyButtonText: 'I\'m Feeling Lucky' },
      { location: 'Amsterdam', server: 'amsterdam.wonderproxy.com', searchButtonText: 'Google zoeken', luckyButtonText: 'Ik doe een gok' },
      { location: 'Venice', server: 'venice.wonderproxy.com', searchButtonText: 'Cerca con Google', luckyButtonText: 'Mi sento fortunato' },
      { location: 'Tokyo', server: 'tokyo.wonderproxy.com', searchButtonText: 'Google 検索', luckyButtonText: 'I\'m Feeling Lucky' },
    ];

    for (const location of locations) {
      it(`should have location specific text for ${location}`, async function () {
        //const browser = await getProxiedBrowser(location.server, 10000, {devtools: true, headless: false, slowMo: 250});
        const browser = await getProxiedBrowser(location.server, 10000, {headless: false, slowMo: 250});
        const page = await getAuthenticatedPage(browser);
        await page.goto('https://google.com');

        // wait for the list to be selectable
        const inputSelector = 'input[type="submit"]';
        await page.waitForSelector(inputSelector);

        const inputList = await page.evaluate((selector) => {
          // This is evaluated in the context of the browser which allows cool tricks but can be confusing.
          const elements = Array.from(document.querySelectorAll(selector));

          // Some things can't be returned from browser context it is best to transform
          //  to a simple data structure before returning.
          // https://github.com/puppeteer/puppeteer/blob/v1.3.0/docs/api.md#pageevaluatepagefunction-args
          // "If the function passed to the page.evaluate returns a non-Serializable value, then page.evaluate resolves to undefined."
          // https://github.com/puppeteer/puppeteer/issues/2418

          return elements.map(element => element.defaultValue);
        }, inputSelector);

        await browser.close();

        // This will get better failure messages indicating expected and actual results
        inputList[0].should.equal(location.searchButtonText);
        inputList[1].should.equal(location.luckyButtonText);

        // This is more robust, will not break if the buttons are re-arranged.
        inputList.should.contain(location.searchButtonText);
        inputList.should.contain(location.luckyButtonText);
      });
    }
  });
});

async function getProxiedBrowser(server, port, options = {}) {
  let proxyUri = `http://${server}:${port}`;
  Object.assign(options, {args: [`--proxy-server=${proxyUri}`]});
  return await puppeteer.launch(options);
}

async function getAuthenticatedPage(browser) {
  // make sure to set PROXY_USER and PROXY_PASS in your environment:
  const username = process.env.PROXY_USER;
  const password = process.env.PROXY_PASS;

  const page = await browser.newPage();
  await page.authenticate({username, password});
  return page;
}
