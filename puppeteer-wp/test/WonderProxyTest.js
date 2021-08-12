// noinspection JSUnusedLocalSymbols
const should = require('chai').should();
const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');

async function getProxiedBrowser(server, port, options={}) {
  // make sure to set PROXY_USER and PROXY_PASS in your environment:
  const user = process.env.PROXY_USER;
  const password = process.env.PROXY_PASS;

  const proxy = await proxyChain.anonymizeProxy(`http://${user}:${password}@${server}:${port}`);
  Object.assign(options, { args: [`--proxy-server=${proxy}`] });
  console.log(options, user, password);
  return await puppeteer.launch(options);
}

describe('WonderProxy website', function () {
  this.timeout(20000);  // increase Mocha's default timeout
  describe('Home Page', function () {
    describe('Title', function () {
      it('should be "Localization testing with confidence - WonderProxy"', async function () {
        //const browser = await getProxiedBrowser('lansing.wonderproxy.com', 10000);
        const browser = await getProxiedBrowser('lansing.wonderproxy.com', 10000, { headless: false, slowMo: 250 });

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
        //const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
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
          //const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
          const page = await browser.newPage();
          await page.goto('https://wonderproxy.com/servers/status');

          // wait for the list to be selectable
          const statusListSelector = '#status > div.has-shadow > ul > li';
          await page.waitForSelector(statusListSelector);

          // evaluate list of server status and turn it into an array of name and status
          const statusList = await page.evaluate((selector) => {
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
