These tests use [Selenium](http://www.seleniumhq.org) and
[WonderProxy](https://wonderproxy.com) to make sure a location-aware
[WonderNetwork website](http://wondernetwork.com/geotest) looks the way it's
supposed to from a few different places around the world.

## Setup

1. You'll need a (local) Selenium server. The simplest way to get one is to
   grab one of the stand-alone JARs from
   http://selenium-release.storage.googleapis.com/index.html and run it with no
   arguments:

    ```
    $ wget https://selenium-release.storage.googleapis.com/2.43/selenium-server-standalone-2.43.1.jar
    $ java -jar selenium-server-standalone-2.43.1.jar
    ```
2. You'll also need [PhantomJS](http://phantomjs.org). Follow the [download
   instructions](http://phantomjs.org/download.html), and make sure the
   `phantomjs` executable ends up in your PATH (e.g. symlink it to
   `/usr/bin/phantomjs`).

## Running the tests

### PHP (`./php`)

1. The PHP demo uses [Composer](https://getcomposer.org) to organize its
   dependencies:

   ```
   $ cd path/to/locale-testing-demo/selenium/php
   $ curl -sS https://getcomposer.org/installer | php
   $ php composer.phar install
   ```
   
2. You'll use the PHPUnit configuration file (`./php/phpunit.xml`) to record
   your WonderProxy username and password. Look for the `PROXY_USER` and
   `PROXY_PASS` values.

3. Spin up your Selenium server and fire away!

   ```
   $ cd path/to/locale-testing-demo/selenium/php
   $ ./vendor/bin/phpunit
   ```

#### Credit

This PHP demo was shamelessly ripped from
[@DavertMik](https://github.com/DavertMik)'s
[php-webdriver-demo](https://github.com/DavertMik/php-webdriver-demo) for
[Selenium](http://www.seleniumhq.org), which he blogged about at
http://codeception.com/11-12-2013/working-with-phpunit-and-selenium-webdriver.html.

### Other languages

Coming soon!

