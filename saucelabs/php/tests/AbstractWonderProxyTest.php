<?php

require_once 'vendor/autoload.php';

abstract class AbstractWonderProxyTest extends Sauce\Sausage\WebDriverTestCase
{

    protected $start_url = 'http://wondernetwork.com/geotest';

    /* the title should be the same regardless of locale */
    public function testTitle()
    {
        $this->assertContains("WonderNetwork", $this->title());
    }

    /** the user city should change depending on the location
     *
     * @dataProvider location
     */ 
    public function testLocation($location)
    {
        $city = $this->byId('user-city');
        $this->assertTextPresent($location, $city);
    }

    abstract public function location();

}
