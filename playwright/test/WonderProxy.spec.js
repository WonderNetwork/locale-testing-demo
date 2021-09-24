const { test, expect } = require('@playwright/test');

const locations = [
    { title: 'Albuquerque', server: 'albuquerque.wonderproxy.com:11000' },
    { title: 'Toronto', server: 'toronto.wonderproxy.com:11000' },
    { title: 'Vancouver', server: 'vancouver.wonderproxy.com:11000' },
];

for (const location of locations) {
    test.describe(`The WonderNetwork Geotest page from ${location.server}`, () => {
        test.skip(
            !process.env.WONDERPROXY_USER || !process.env.WONDERPROXY_USER,
            'Proxy credentials are missing'
        );

        // use the proxy for each test
        test.use({
            proxy: {
                server: `http://${location.server}`,
                username: process.env.WONDERPROXY_USER,
                password: process.env.WONDERPROXY_PASS
            }
        });

        test.beforeEach(async ({ page }) => {
            await page.goto('https://wondernetwork.com/geotest');
        });

        test('has the right title', async ({page}) => {
            await expect(page).toHaveTitle('Geotest - WonderNetwork');
        });

        test(`displays ${location.title} as the city`, async ({page}) => {
            const cityLocator = await page.locator('#user-city');

            await expect(cityLocator).toHaveText(location.title);
        });
    });
}
