<?php
class WonderProxyLocaleTest extends PHPUnit_Framework_TestCase {

    use WebDriverAssertions;
    use WebDriverDevelop;

    /** @var $selenium Selenium server */
    protected $selenium = 'http://localhost:4444/wd/hub';
    /** @var \RemoteWebDriver */
    protected $driver;
    /** @var $url web page to be tested */
    protected $url = 'http://wondernetwork.com/geotest';

    protected function proxied($proxy) {
        $capabilities = DesiredCapabilities::phantomjs();
        $capabilities->setCapability(WebDriverCapabilityType::PROXY, [
            'proxyType' => 'MANUAL',
            'httpProxy' => $proxy,
            'ftpProxy' => $proxy,
            'sslProxy' => $proxy,
            'noProxy' => null
        ]);
        $capabilities->setCapability('phantomjs.cli.args', ['--proxy-auth='.PROXY_USER.':'.PROXY_PASS]);
        return RemoteWebDriver::create($this->selenium, $capabilities);
    }

    public function tearDown() {
        $this->driver->close();
    }

    /**
     * @dataProvider proxies
     */
    public function testHome($proxy) {
        $this->driver = $this->proxied($proxy);

        $this->driver->get($this->url);
        $this->assertContains('WonderNetwork', $this->driver->getTitle());
    }

    /**
     * @dataProvider userLocations
     */
    public function testUserLocation($proxy, $expected) {
        $this->driver = $this->proxied($proxy);

        $this->driver->get($this->url);
        $search = $this->driver->findElement(WebDriverBy::id('user-city'));
        $this->assertContains($expected, $search->getText());
    }

    public function proxies() {
        return [
            ['albuquerque.wonderproxy.com:11000'],
            ['toronto.wonderproxy.com:11000'],
            ['vancouver.wonderproxy.com:11000'],
        ];
    }

    public function userLocations() {
        return [
            ['albuquerque.wonderproxy.com:11000', 'Albuquerque'],
            ['toronto.wonderproxy.com:11000', 'Toronto'],
            ['vancouver.wonderproxy.com:11000', 'Vancouver'],
        ];
    }
}
