[Sauce Labs](https://saucelabs.com/) offers testing-as-a-service: You point
your [Selenium](http://seleniumhq.org) tests at them and they run the tests on a [crazily wide
variety of platforms](https://saucelabs.com/platforms). Using [Sauce
Connect](https://wiki.saucelabs.com/display/DOCS/Sauce+Connect+Proxy),
[WonderProxy](https://wonderproxy.com) can add localization testing into that
mix.

## Setup

### Mac OSX and Linux

1. Follow the [basic setup
   instructions](https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect+Proxy)
   for Sauce Connect. Make sure the `sc` binary ends up in your `PATH`.
2. Create environment variables for your Sauce Labs credentials.
   
   ```
   $ export SAUCE_USERNAME=<your Sauce username>
   $ export SAUCE_ACCESS_KEY=<your Sauce access key>
   ```

3. Create environment variables for your WonderProxy credentials.

   ```
   $ export WONDERPROXY_USER=<your WonderProxy username>
   $ export WONDERPROXY_PASS=<your WonderProxy password>
   ```

### Windows 10

1. Follow the [basic setup
   instructions](https://wiki.saucelabs.com/display/DOCS/Setting+Up+Sauce+Connect+Proxy)
   for Sauce Connect. Copy the Sauce Connect executable (at `bin/sc.exe`) to
   your current directory.
2. Create environment variables for your Sauce Labs credentials. (Use the
   [instructions from Sauce
   Labs](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials)
   if you're not sure how to do that.) `SAUCE_USERNAME` must be your Sauce Labs
   username, and `SAUCE_ACCESS_KEY` must be your Sauce Labs access key.
3. Create environment variables for your WonderProxy credentials.
   `WONDERPROXY_USER` must be your WonderProxy username, and
   `WONDERPROXY_PASS` must be your WonderProxy password.

## Create Sauce Connect Tunnels

### Mac OSX and Linux

The `sauce_connect.sh` helper script will create one tunnel for each
WonderProxy server name that you specify as an argument. For example:

```
# creates two tunnels: one for telaviv.wonderproxy.com, and one for
# london.wonderproxy.com
$ ./sauce_connect.sh telaviv london
```

The demos here use the Albquerque, Tel Aviv, and Vancouver WonderProxy servers,
so you'll need three tunnels:

```
$ ./sauce_connect.sh albuquerque telaviv vancouver
```

### Windows 10

The helper scripts for Windows must be run in PowerShell, so [open a PowerShell
console window](https://docs.microsoft.com/en-us/powershell/scripting/setup/starting-windows-powershell?view=powershell-6)
and [change to the directory](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/cookbooks/managing-current-location?view=powershell-6#setting-your-current-location-set-location)
that holds this demo.

The `sauce_connect.ps1` helper script will create one tunnel for each
WonderProxy server name that you specify as an argument. For example:

```
# creates two tunnels: one for telaviv.wonderproxy.com, and one for
# london.wonderproxy.com
> .\sauce_connect.ps1 telaviv london
```

The demos here use the Albquerque, Tel Aviv, and Vancouver WonderProxy servers,
so you'll need three tunnels:

```
> .\sauce_connect.sh albuquerque telaviv vancouver
```

## Run the tests (Mac OSX and Linux only)

The automated tests in this demo have only been tested on Mac OSX and Linux. If
you're running Windows, the tunnels are still available for [manual testing on
Sauce Labs](https://wiki.saucelabs.com/display/DOCS/Running+Live+Website+Tests)!

If you have installed [PHP](https://php.net) on your Windows 10 system,
you should be able to follow along below as well.

### PHP (`./php`)

The PHP demo uses [Composer](https://getcomposer.org) to organize its
dependencies, so you'll need to
[have that installed first](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx).

1. Use [Composer](https://getcomposer.org) to install the Sauce Labs
   [Sausage](https://github.com/jlipps/sausage) library, which bundles
   [PHPUnit](https://phpunit.d) with some extra helpers:

   ```
   $ cd ./php
   $ composer install
   ```
2. Configure the Sausage library with your Sauce Labs credentials:
   
   ```
   $ ./vendor/bin/sauce_config "$SAUCE_USERNAME" "$SAUCE_ACCESS_KEY"
   ```
3. Sausage provides the `paratest` tool for running multiple tests in
   parallel. Set `--processes` to the number of parallel tests you want to run.
   We'll use `10` here:

   ```
   $ ./vendor/bin/paratest --processes 10 --functional tests/
   ```

### Other languages

Coming soon!

## Close the Sauce Connect Tunnels

### Mac OSX and Linux

The `sauce_disconnect.sh` helper script will close the tunnel for each
WonderProxy server name that you specify as an argument and will clean up any logs and
output files.

```
# close three tunnels
$ ./sauce_disconnect.sh albuquerque telaviv vancouver
```

### Windows 10

The `sauce_disconnect.ps1` helper script will close the tunnel for each
WonderProxy server name that you specify as an argument and will clean up any logs and
output files.

```
# close three tunnels
$ .\sauce_disconnect.ps1 albuquerque telaviv vancouver
```
