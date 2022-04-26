<?php

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Facebook\WebDriver\WebDriverExpectedCondition;
use PHPUnit\Framework\TestCase;

abstract class AbstractWonderProxyTest extends TestCase {
    protected string $targetUrl = 'https://wondernetwork.com/geotest';
    protected RemoteWebDriver $driver;

    protected string $tunnel;
    protected string $userCity;

    public function __construct(?string $name = null, array $data = [], $dataName = '') {
        parent::__construct($name, $data, $dataName);

        $desiredCapabilities = DesiredCapabilities::firefox()
            ->setPlatform('Windows 10')
            ->setCapability('sauce:options', [
                'username' => getenv('SAUCE_USERNAME'),
                'accessKey' => getenv('SAUCE_ACCESS_KEY'),
                'name' => $this->tunnel,
                'tunnelIdentifier' => $this->tunnel,
            ]);

        $this->driver = RemoteWebDriver::create(
            'https://ondemand.us-west-1.saucelabs.com/wd/hub',
            $desiredCapabilities,
            60000,
            60000
        );
    }

    public function onNotSuccessfulTest($e): void {
        $this->driver->executeScript('sauce:job-result=failed');

        parent::onNotSuccessfulTest($e);
    }

    public function testPage() {
        $this->driver->get($this->targetUrl);

        $this->assertStringContainsString(
            "WonderNetwork",
            $this->driver->getTitle()
        );

        $finder = WebDriverBy::id('user-city');
        $this->driver->wait(60, 1000)
                     ->until(WebDriverExpectedCondition::presenceOfElementLocated($finder));

        $city = $this->driver->findElement($finder);
        $this->assertStringContainsString($this->userCity, $city->getText());

        $this->driver->executeScript('sauce:job-result=passed');

        $this->driver->quit();
    }
}
