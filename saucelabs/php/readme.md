**We strongly recommend using Playwright to run automated localization tests on
Sauce Labs**, and we have [instructions](../playwright/readme.md) to help
you get started!

If you create your automated end-to-end tests with PHP and [Selenium](http://seleniumhq.org),
you can use [Sauce Connect](https://docs.saucelabs.com/secure-connections/sauce-connect/)
and [WonderProxy](https://wonderproxy.com) to add multi-platform
localization tests.

## Create Sauce Connect tunnels

Follow [our instructions](../readme.md) for creating your Sauce Connect
tunnels. You'll need tunnels for `albuquerque`, `telaviv`, and `vancouver`.

## Run the tests with PHP and Selenium

The automated tests in this demo have only been tested on Mac OSX and Linux.
If you have installed [PHP](https://php.net) on your Windows 10 system,
you should be able to follow along below as well.

The PHP demo uses [Composer](https://getcomposer.org) to organize its
dependencies.

1. Use [Composer](https://getcomposer.org) to install the [PHP WebDriver
   client](https://github.com/php-webdriver/php-webdriver/),
   [PHPUnit](https://phpunit.de), and
   [`paratest`](https://github.com/paratestphp/paratest):

   ```
   $ composer install
   ```
3. Run the tests:

   ```
   $ ./vendor/bin/paratest tests/
   ```
