These tests use [Puppeteer](https://pptr.dev) and
[WonderProxy](https://wonderproxy.com) to make sure a location-aware
[WonderNetwork website](https://wondernetwork.com/geotest) looks the way it's
supposed to from a few different places around the world.

## Setup

1. Playwright needs NodeJS v10 or higher (see `package.json` for reference).
2. If you're setting up a new project instead of using our
   pre-built `package.json`:
3. Initialize `npm`:
   ```
   $ npm init
   ```
   The command to run tests should be `jest`
4. Create a reasonable `.gitignore` file:
   ```
   $ npx gitignore node
   ```
5. Add Puppeteer and Jest, a test framework, as dev dependencies:
   ```
   $ npm install --save-dev puppeteer jest
   ```
6. Install the dependencies:
   ```
   $ npm install
   ```
7. The tests will pull your WonderProxy credentials from environment variables:
   ```
   $ export WONDERPROXY_USER=<your WonderProxy username>
   $ export WONDERPROXY_PASS=<your WonderProxy password>
   ```
8. Our demo tests use the **Albuquerque**, **Toronto**, and **Vancouver** WonderProxy
   locations, so make sure
   you've [added those servers to your account](https://wonderproxy.com/my/servers).

## Write your tests

Jest will automically run any test file in the `./test` directory that
ends with `.spec.js`. In this demo, that's `./test/WonderProxy.spec.js`.

## Run your tests

This Puppeteer demo has been tested on with Puppeteer 10 and Jest 27, running
on Node 14.

The default `npm test` command is configured to run `jest`, so
you can use that to run your tests:

```
$ npm test
```

Additional settings are available on
the [command-line](https://jestjs.io/docs/cli).

## Disclaimers

#### Puppeteer `page.evaluate` potential pitfall

* Some things can't be returned from browser context. It is best to transform to a simple data structure before returning.
* https://github.com/puppeteer/puppeteer/blob/v1.3.0/docs/api.md#pageevaluatepagefunction-args

> If the function passed to the `page.evaluate` returns a non-Serializable value, then `page.evaluate` resolves to undefined.

* https://github.com/puppeteer/puppeteer/issues/2418

#### Basic authentication

This demo uses `page.authenticate` to send proxy credentials. If you need to
test against a site that uses HTTP Basic authentication, this may not be a
viable solution. Using Squid or another intermediate proxy to handle proxy server
authentication may be a solution in this advanced use case.

## Resources

* https://github.com/puppeteer/puppeteer
* https://pptr.dev/
* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
