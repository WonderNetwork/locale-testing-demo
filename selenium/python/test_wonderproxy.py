#!/usr/bin/env python3

from os import environ as evar
import unittest
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class WonderProxyTest(unittest.TestCase):

    driver = None
    selenium = 'http://localhost:4444/wd/hub'
    url = 'https://wondernetwork.com/geotest'

    def proxied(self, proxy):
        capabilities = DesiredCapabilities.PHANTOMJS.copy()
        capabilities['phantomjs.cli.args'] = [
            '--proxy=' + proxy,
            '--proxy-type=http',
            '--proxy-auth=' + evar.get('WONDERPROXY_USER') + ':' + evar.get('WONDERPROXY_PASS')
        ]

        return webdriver.Remote(
            command_executor=self.selenium,
            desired_capabilities=capabilities
        )

    def tearDown(self):
        self.driver.close()

    def testUserLocationAlbuquerque(self):
        self.driver = self.proxied('albuquerque.wonderproxy.com:11000')
        self.driver.get(self.url)
        search = self.driver.find_element_by_id('user-city')
        self.assertIn('Albuquerque', search.text)

    def testUserLocationToronto(self):
        self.driver = self.proxied('toronto.wonderproxy.com:11000')
        self.driver.get(self.url)
        search = self.driver.find_element_by_id('user-city')
        self.assertIn('Toronto', search.text)

    def testUserLocationVancouver(self):
        self.driver = self.proxied('vancouver.wonderproxy.com:11000')
        self.driver.get(self.url)
        search = self.driver.find_element_by_id('user-city')
        self.assertIn('Vancouver', search.text)

if __name__ == '__main__':
    unittest.main()
