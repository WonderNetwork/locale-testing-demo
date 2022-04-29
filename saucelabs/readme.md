[Sauce Labs](https://saucelabs.com/) offers testing-as-a-service: You point
your [Selenium](http://seleniumhq.org) tests at them and they run the tests on a [wide
variety of platforms](https://saucelabs.com/platforms). Using [Sauce
Connect](https://docs.saucelabs.com/secure-connections/sauce-connect/) or
[Playwright](https://playwright.dev),
[WonderProxy](https://wonderproxy.com) can add localization testing into that
mix.

## Automated testing

Check out the instructions for [Playwright](./playwright) or [PHP and
Selenium](./php).

## Manual testing with Sauce Connect

### Mac OSX and Linux

#### Setup

1. Follow the [basic setup
   instructions](https://docs.saucelabs.com/secure-connections/sauce-connect/quickstart/)
   for Sauce Connect. Make sure the `sc` binary ends up in your `PATH`.
2. Create environment variables for your Sauce Labs credentials.
   
   ```
   $ export SAUCE_USERNAME=<your Sauce username>
   $ export SAUCE_ACCESS_KEY=<your Sauce access key>
   ```

3. Create environment variables for your WonderProxy credentials.

   ```
   $ export WONDERPROXY_USER=<your WonderProxy username>
   $ export WONDERPROXY_TOKEN=<your WonderProxy token>
   ```

#### Create Sauce Connect tunnels

The `sauce_connect.sh` helper script will create one tunnel for each
WonderProxy server name that you specify as an argument. For example:

```
# creates two tunnels: one for telaviv.wonderproxy.com, and one for
# london.wonderproxy.com
$ ./sauce_connect.sh telaviv london
```

The demos here use the Albuquerque, Tel Aviv, and Vancouver WonderProxy servers,
so you'll need three tunnels:

```
$ ./sauce_connect.sh albuquerque telaviv vancouver
```

### Windows 10

#### Setup

1. Follow the [basic setup
   instructions](https://docs.saucelabs.com/secure-connections/sauce-connect/quickstart/)
   for Sauce Connect. Copy the Sauce Connect executable (at `bin/sc.exe`) to
   your current directory.
2. Create environment variables for your Sauce Labs credentials. (Use the
   [instructions from Sauce
   Labs](https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/environment-variables/)
   if you're not sure how to do that.) `SAUCE_USERNAME` must be your Sauce Labs
   username, and `SAUCE_ACCESS_KEY` must be your Sauce Labs access key.
3. Create environment variables for your WonderProxy credentials.
   `WONDERPROXY_USER` must be your WonderProxy username, and
   `WONDERPROXY_TOKEN` must be your WonderProxy token.

#### Create Sauce Connect tunnels

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

The demos here use the Albuquerque, Tel Aviv, and Vancouver WonderProxy servers,
so you'll need three tunnels:

```
> .\sauce_connect.sh albuquerque telaviv vancouver
```

### Start testing manually

Head over to [Sauce](https://app.saucelabs.com/dashboard/live/vdc) to start 
testing on their platform. When you configure the test, make sure you choose 
one of the tunnels!

### Close the tunnels

When you're done testing, clean up the tunnels you created.

#### Mac OSX and Linux

The `sauce_disconnect.sh` helper script will close the tunnel for each
WonderProxy server name that you specify as an argument and will clean up any logs and
output files.

```
# close three tunnels
$ ./sauce_disconnect.sh albuquerque telaviv vancouver
```

#### Windows 10

The `sauce_disconnect.ps1` helper script will close the tunnel for each
WonderProxy server name that you specify as an argument and will clean up any logs and
output files.

```
# close three tunnels
$ .\sauce_disconnect.ps1 albuquerque telaviv vancouver
```
