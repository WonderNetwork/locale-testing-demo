If you use [Playwright](https://playwright.dev) for your automated
end-to-end tests, you can use [`saucectl`](https://docs.saucelabs.com/dev/cli/saucectl/)
and [WonderProxy](https://wonderproxy.com) to add multi-platform
localization tests.

## Automated testing with Playwright and `saucectl`

Playwright has native support for authenticated proxy servers, so you don't
need to use Sauce Connect. Instead, you'll use `saucectl`, the command-line
client for the Sauce Labs platform.

### Setup

1. Follow the [basic setup
   instructions](https://docs.saucelabs.com/dev/cli/saucectl/#installing-saucectl)
   for `saucectl`. Make sure the `saucectl` binary ends up in your `PATH`.
2. Create environment variables for [your Sauce Labs
   credentials](https://app.saucelabs.com/user-settings).

   ```
   $ export SAUCE_USERNAME=<your Sauce username>
   $ export SAUCE_ACCESS_KEY=<your Sauce access key>
   ```

3. [Associate](https://docs.saucelabs.com/dev/cli/saucectl/#associate-your-credentials)
   your Sauce Labs credentials with `saucectl`.

   ```
   $ saucectl configure
   ```

4. Create environment variables for your WonderProxy credentials. You can
   get a new WonderProxy token
   [in your account](https://wonderproxy.com/my/settings).

   ```
   $ export WONDERPROXY_USER=<your WonderProxy username>
   $ export WONDERPROXY_TOKEN=<your WonderProxy token>
   ```

### Run the tests

```
$ saucectl run --env WONDERPROXY_USER="$WONDERPROXY_USER" --env WONDERPROXY_TOKEN="$WONDERPROXY_TOKEN"
```
