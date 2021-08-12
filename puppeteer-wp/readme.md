# Getting started with Puppeteer
* Puppeteer needs Node v10.18.1 or higher (see package.json for reference)
* `npm init`
  * set project name, etc, skip if adding test to existing project
  * when it asks the command to run the tests: `mocha`
* `npx gitignore node`
* `npm i -D puppeteer`
  * this will download a browser to work with (120mb or so)
  * alternative is puppeteer-core which is out of scope
* `npm i -D mocha chai`
  * test framework stuff
  * these could be combined with puppeteer into a single command for installing the dependencies
* write tests
  * create directory: `test`
  * create file: `WonderProxyTest.js`
* run tests
  * `npm test`
* more docs:
  * Puppeteer:
    * https://github.com/puppeteer/puppeteer
    * https://pptr.dev/
  * CSS Selectors:
    * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
    * https://www.checklyhq.com/learn/headless/basics-selectors/
    * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
  


# Apify proxy-chain:
* Squid is being elusive, Will still work on it but having some issues
* stop-gap alternative is proxy-chain which is Node only
* https://blog.apify.com/how-to-make-headless-chrome-and-puppeteer-use-a-proxy-server-with-authentication-249a21a79212/
* https://www.npmjs.com/package/proxy-chain



  
# Squid proxy information
* Puppeteer supports proxy configuration but has less support for authenticated proxies
* one option is to use page.authenticate() but this will get complex if the site under test also required authentication
* the other option is to use a local proxy which will add the authentication
* Squid in non-caching mode will be used as the local proxy for this article

# Install Squid - todo
* linux - distribution specific
  * Debian/Ubuntu
  * RH/Fedora/CentOS
* brew
* docker
* Windows - untested ymmv

# Squid configuration - todo

# Running Squid - todo


