# Getting started with Puppeteer
* Puppeteer needs Node v10.18.1 or higher (see package.json for reference)
* `npm init`
  * set project name, etc, skip if adding test to existing project
  * when it asks the command to run the tests: `mocha`
* `npx gitignore node`
* `npm i -D puppeteer`
  * this will download a browser to work with (120mb or so)
  * alternative is puppeteer-core which is out of scope
* `npm i -D mocha chai`
  * test framework stuff
  * these could be combined with puppeteer into a single command for installing the dependencies
* write tests
  * create directory: `test`
  * create file: `WonderProxyTest.js`
* run tests
  * `npm test`
* more docs:
  * Puppeteer:
    * https://github.com/puppeteer/puppeteer
    * https://pptr.dev/
  * Puppeteer 'page.evaluate' potential pitfall:
    * Some things can't be returned from browser context it is best to transform to a simple data structure before returning.
      * https://github.com/puppeteer/puppeteer/blob/v1.3.0/docs/api.md#pageevaluatepagefunction-args
        * "If the function passed to the page.evaluate returns a non-Serializable value, then page.evaluate resolves to undefined."
      * https://github.com/puppeteer/puppeteer/issues/2418
  * CSS Selectors:
    * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
    * https://www.checklyhq.com/learn/headless/basics-selectors/
    * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
* Integrating Wonder Proxy
  * Proxy servers must be added in the WP portal before running the test
  * Setting proxy
    * Add `--proxyserver=http://<server_address>:<port>` to the `args` array when launching Puppeteer
    * See the `getProxiedBrowser` function for an example of this.
  * Authenticating to proxy
    * Use the `page.authenticate` function to pass in credentials
    * See the `getAuthenticatedPage` function for an example of this.
    * When testing against a site that uses basic-auth, this may not be a viable solution.
      * Using Squid or another intermediate proxy adding proxy authentication may be a solution in this advanced use case.
    * Username and password are taken from the environment, set these in the environment before running the test
      * This is to keep them from being checked in to source control.
      * when setting credentials in IDE configuration make sure that is not being checked into source control.
  
  
