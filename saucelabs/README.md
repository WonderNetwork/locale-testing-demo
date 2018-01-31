[SauceLabs](https://saucelabs.com/) offers testing-as-a-service: You point
your [Selenium](http://seleniumhq.org) tests at them, they run the tests on a [crazily wide
variety of platforms](https://saucelabs.com/platforms). Using [Sauce
Connect](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy),
[WonderProxy](https://wonderproxy.com) can add localization testing to that
mix.

## Setup

1. Follow the [basic setup
   instructions](https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect+Proxy)
   for Sauce Connect. Make sure the `sc` binary ends up in your `PATH`.
2. Create environment variables for your SauceLabs credentials.
   
   ```
   $ export SAUCE_USERNAME=<your Sauce username>
   $ export SAUCE_ACCESS_KEY=<your Sauce access key>
   ```

3. Create environment variables for your WonderProxy credentials.

   ```
   $ export WONDERPROXY_USER=<your WonderProxy username>
   $ export WONDERPROXY_PASS=<your WonderProxy password>
   ```
5. Retrieve the dependencies for the demo PHPUnit tests. It uses [Composer](https://getcomposer.org) to organize its
   dependencies, so you'll need to [have that installed first](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx).

   ```
   $ cd ./php
   $ composer install
   ```

## Creating Sauce Connect Tunnels

The `sauce_connect.sh` helper script will create one tunnel for each
WonderProxy server name listed as an argument. For example:

```
# creates two tunnels: one for telaviv.wonderproxy.com, and one for
# london.wonderproxy.com
$ ./sauce_connect.sh telaviv london
```

The demos here use the Albquerque, Tel Aviv and Vancouver WonderProxy servers,
so you'll need three tunnels:

```
$ ./sauce_connect.sh albuquerque telaviv vancouver
```

## Running the tests

### PHP (`./php`)

Running Composer (above) will pull in the [Sausage](https://github.com/jlipps/sausage) library, which provides a convenient tool for running multiple tests in parallel.

   ```
   $ cd ./php

   # run up to eight tests in parallel
   $ ./vendor/bin/paratest -p 8 -f --phpunit=vendor/bin/phpunit tests/
   ```

### Other languages

Coming soon!

## Closing the Sauce Connect Tunnels

The `sauce_disconnect.sh` helper script will close the tunnel for each
WonderProxy server name listed as an argument, as well as clean up any logs and
output files.

```
# close three tunnels
$ ./sauce_disconnect.sh albuquerque telaviv vancouver
```
