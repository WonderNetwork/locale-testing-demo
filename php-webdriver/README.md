Setup
-----

1. You'll need a Selenium server. The simplest way to get one is to grab a
   stand-alone JAR from
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
3. This demo is set up as a [Composer](https://getcomposer.org) package, so
   you'll need Composer to set up your dependencies:

   ```
   $ cd path/to/repo/php-webdriver
   $ curl -sS https://getcomposer.org/installer | php
   $ php composer.phar install
   ```
4. Make sure you update your WonderProxy username and password in
   `phpunit.xml` (look for the PROXY_USER and PROXY_PASS values).

Running the tests
-----------------

Spin up your Selenium server and fire away!

```
$ cd path/to/locale-testing-demo/php-webdriver
$ ./vendor/bin/phpunit
```

Credit
======

This PHP demo was shamelessly ripped from
[@DavertMik](https://github.com/DavertMik)'s
[php-webdriver-demo](https://github.com/DavertMik/php-webdriver-demo), which he
blogged about at
http://codeception.com/11-12-2013/working-with-phpunit-and-selenium-webdriver.html.
