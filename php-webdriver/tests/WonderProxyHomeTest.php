<?php
class WonderProxyLocaleTest extends PHPUnit_Framework_TestCase {

    use WebDriverAssertions;
    use WebDriverDevelop;

    /** @var $selenium Selenium server */
    protected $selenium = 'http://localhost:4444/wd/hub';
    /** @var \RemoteWebDriver */
    protected $driver;
    /** @var $url AUT */
    protected $url = 'https://wonderproxy.com';

    protected function proxied($proxy) {
        $capabilities = DesiredCapabilities::phantomjs();
        $capabilities->setCapability(WebDriverCapabilityType::PROXY, [
            'proxyType' => 'MANUAL',
            'httpProxy' => $proxy,
            'ftpProxy' => $proxy,
            'sslProxy' => $proxy,
            'noProxy' => null
        ]);
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
        $this->assertContains('WonderProxy', $this->driver->getTitle());
    }

    /**
     * @dataProvider userLocations
     */
    public function testUserLocation($proxy, $expected) {
        $this->driver = $this->proxied($proxy);

        $this->driver->get($this->url);
        $search = $this->driver->findElement(WebDriverBy::id('user-location'));
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
            ['albuquerque.wonderproxy.com:11000', 'New Mexico'],
            ['toronto.wonderproxy.com:11000', 'Ontario'],
            ['vancouver.wonderproxy.com:11000', 'British Columbia'],
        ];
    }
}
