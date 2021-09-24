These tests use [Playwright](https://playwright.dev) and
[WonderProxy](https://wonderproxy.com) to make sure a location-aware
[WonderNetwork website](https://wondernetwork.com/geotest) looks the way it's
supposed to from a few different places around the world.

## Setup

1. Playwright needs NodeJS v12 or higher (see `package.json` for reference).
2. If you're setting up a new project instead of using our
   pre-built `package.json`:
   1. Initialize `npm`:
      ```
      $ npm init
      ```
      The command to run tests should be `npx playwright test`
   2. Create a reasonable `.gitignore` file:
      ```
      $ npx gitignore node
      ```
   3. Add Playwright Test as a dev dependency:
      ```
      $ npm install --save-dev @playwright/test
      ```
3. Install the dependencies:
   ```
   $ npm install
   $ npx playwright install
   ```
4. The tests will pull your WonderProxy credentials from environment variables:
   ```
   $ export WONDERPROXY_USER=<your WonderProxy username>
   $ export WONDERPROXY_PASS=<your WonderProxy password>
   ```
5. Our demo tests use the **Albquerque**, **Toronto**, and **Vancouver** WonderProxy
   locations, so make sure
   you've [added those servers to your account](https://wonderproxy.com/my/servers).

## Write your tests

Playwright will automically run any test file in the `./test` directory that
ends with `.spec.js`. In this demo, that's `./test/WonderProxy.spec.js`.

## Run your tests

This Playwright demo has been tested on with Playwright 1.14 and 1.15, running
on Node 12 and 14.

The default `npm test` command is configured to run `npx playwright test`, so
you can use that to run your tests:

```
$ npm test
```

Additional settings are available on
the [command-line](https://playwright.dev/docs/intro#learning-the-command-line):

```
$ npx playwright test --headed          # run the browser with a graphical interface
$ npx playwright test --browser=all     # run tests in all the installed browsers
$ npx playwright test --browser=firefox # run tests in firefox
```

## Resources

* https://playwright.dev/docs/intro
* https://playwright.dev/docs/test-assertions
* https://playwright.dev/docs/test-fixtures
* https://playwright.dev/docs/test-configuration
* https://playwright.dev/docs/intro#learning-the-command-line
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
