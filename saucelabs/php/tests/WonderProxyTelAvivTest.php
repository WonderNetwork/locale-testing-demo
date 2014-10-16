<?php

require_once 'AbstractWonderProxyTest.php';

class WonderProxyTelAvivTest extends AbstractWonderProxyTest {
    const TUNNEL_ID = 'telaviv';

    public static $browsers = [
        /* run Internet Explorer on Windows 8 on Sauce */
        [
            'browserName' => 'internet explorer',
            'desiredCapabilities' => [
                'platform' => 'Windows 8',
                'tunnel-identifier' => self::TUNNEL_ID,
            ]
        ],
        /* run Chrome on Linux on Sauce */
        [
            'browserName' => 'chrome',
            'desiredCapabilities' => [
                'platform' => 'Linux',
                'tunnel-identifier' => self::TUNNEL_ID,
          ]
      ],
    ];

    public function location() {
        return [[ 'Holon' ]];
    }
}

