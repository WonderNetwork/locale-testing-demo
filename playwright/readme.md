# Getting started with Playwright and Wonder Proxy

* Playwright needs Node v12 or higher (see package.json for reference)
* `npm init`
   * set project name, etc, skip if adding test to existing project
   * when it asks the command to run the tests: `npx playwright test`
* `npx gitignore node`
   * this adds a reasonable default .gitignore file
* `npm i -D @playwright/test`
  * install playwright into node_modules and save it as a development dependency 
* `npx playwright install`
  * this will download browsers to work with (240mb or so)
  * also sets up some playwright helpers
* write tests
  * create directory: `test`
  * create file: `WonderProxy.spec.js`
* run tests
  * `npm test` (which runs `npx playwright test`)
  * Alternatives:
    * `npx playwright test --headed`
    * `npx playwright test --browser=all`
    * `npx playwright test --browser=firefox`
    * See: https://playwright.dev/docs/intro#learning-the-command-line
  * With proxy auth
    * `PROXY_USER=<username> PROXY_PASS=<secretPassword> npm test`
    * `PROXY_USER=<username> PROXY_PASS=<secretPassword> npx playwright test --headed`
* More docs:
  * Playwright:
    * https://playwright.dev/docs/intro
    * https://playwright.dev/docs/test-assertions
    * https://playwright.dev/docs/test-fixtures
    * https://playwright.dev/docs/test-configuration
    * https://playwright.dev/docs/intro#learning-the-command-line
  * CSS Selectors:
    * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
    * https://www.checklyhq.com/learn/headless/basics-selectors/
    * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
* Integrating Wonder Proxy
  * Proxy servers must be added in the WP portal before running the test
  * Setting proxy and authentication:
    * Add proxy configuration to the test fixture in a test.describe block
    * See the code for a sample of this.
    * Username and password are taken from the environment, set these in the environment before running the test
      * This is to keep them from being checked in to source control.
      * when setting credentials in IDE configuration make sure that is not being checked into source control.
  * Note that Venice and Amsterdam have cookie acceptance dialogs that obscure the buttons, so while the buttons are there they are not visible to a human user until the dialog is accepted.
