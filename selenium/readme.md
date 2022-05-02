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
    $ wget http://selenium-release.storage.googleapis.com/3.4/selenium-server-standalone-3.4.0.jar
    $ java -jar selenium-server-standalone-3.4.0.jar
    ```
2. You'll also need [PhantomJS](http://phantomjs.org). Follow the [download
   instructions](http://phantomjs.org/download.html), and make sure the
   `phantomjs` executable ends up in your PATH (e.g. symlink it to
   `/usr/bin/phantomjs`).
3. The Selenium test demos will pull your WonderProxy credentials from
   environment variables:

   ```
   $ export WONDERPROXY_USER=<your WonderProxy username>
   $ export WONDERPROXY_TOKEN=<your WonderProxy token>
   ```

## Running the tests

### PHP (`./php`)

The PHP demo has been tested on PHP 5.6 and 7.4.

1. The PHP demo uses [Composer](https://getcomposer.org) to organize its
   dependencies:

   ```
   $ cd path/to/locale-testing-demo/selenium/php
   $ curl -sS https://getcomposer.org/installer | php
   $ php composer.phar install
   ```
   
2. Spin up your Selenium server and fire away!

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

### Python (`./python`)

1. The Python demo runs on Python 3.2+. It might work on earlier versions, but
   it's not tested!
2. Follow [Selenium's
   instructions](http://selenium-python.readthedocs.org/installation.html) to
   set up the Python/Selenium bindings.
3. Make sure your Selenium server is still running, and off you go!
   
   ```
   $ cd path/to/locale-testing-demo/selenium/python
   $ python3 test_wonderproxy.py
   ```

### Other languages

Coming soon!

