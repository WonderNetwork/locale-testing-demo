// noinspection JSUnusedLocalSymbols
const puppeteer = require('puppeteer');

jest.setTimeout(20000);

describe.each([
    { title: 'Albuquerque', server: 'albuquerque.wonderproxy.com:11000' },
    { title: 'Toronto', server: 'toronto.wonderproxy.com:11000' },
    { title: 'Vancouver', server: 'vancouver.wonderproxy.com:11000' },
])('The WonderNetwork Geotest page from $server', ({ title, server }) => {
    let browser, page;

    beforeAll(async () => {
        browser = await getProxiedBrowser(server);
        page = await getAuthenticatedPage(browser);
        await page.goto('https://wondernetwork.com/geotest');
    });

    it('has the right title', async () => {
        const title = await page.title();
        expect(title).toBe('Geotest - WonderNetwork');
    });

    it(`displays ${title} as the city`, async () => {
        const element = await page.$('#user-city');
        expect(await element.evaluate(node => node.innerText)).toBe(title);
    });

    afterAll(async () => {
        await browser.close();
    });
});

async function getProxiedBrowser(server, options = {}) {
    return await puppeteer.launch({
        args: [`--proxy-server=http://${server}`],
        ...options
    });
}

async function getAuthenticatedPage(browser) {
    // make sure to set WONDERPROXY_USER and WONDERPROXY_PASS in your environment
    const username = process.env.WONDERPROXY_USER;
    const password = process.env.WONDERPROXY_PASS;

    if (!username || !password) {
        throw new Error('Proxy credentials are missing');
    }

    const page = await browser.newPage();
    await page.authenticate({username, password});

    return page;
}
