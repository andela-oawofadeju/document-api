/* eslint func-names: "off"*/
/* eslint no-unused-vars: "off"*/
const config = require('../../../nightwatch.conf');

module.exports = { // adapted from: https://git.io/vodU0
  'Doc Management Title': function (browser) {
    browser
      .url('http://localhost:3001/login')
      .waitForElementVisible('body')
      .assert.title('localhost')
      .saveScreenshot('doc-man-login.png')
      .end();
  },

  'Login Users': function (browser) {
    browser
      .url('http://localhost:3001/login')
      .waitForElementVisible('body')
      .setValue('input[type=email]', 'oyendah@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('input[type="submit"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3001/dashboard')
      .end();
  },

  // 'Admin User Dashboard Page': function (browser) {
  //   browser
  //     .url('http://localhost:4000/login')
  //     .waitForElementVisible('input[type=email]')
  //     .setValue('input[type=email]', 'oyendah@gmail.com')
  //     .setValue('input[type=password]', 'password')
  //     .click('input[type="submit"]')
  //     .pause(1000)
  //     .assert.urlEquals('http://localhost:4000/')
  //     .assert.containsText('h4', 'DASHBOARD')
  //     .assert.containsText('nav', 'Doc Management')
  //     .assert.containsText('nav', 'My Documents')
  //     .assert.containsText('nav', 'Manage Users')
  //     .assert.containsText('nav', 'Manage Roles')
  //     .assert.cssClassPresent('#adminTab', 'admin')
  //     .assert.containsText('nav', 'Logout')
  //     .click('nav ul li a#logout')
  //     .end();
  // },

  // 'Regular Users Dashboard Page': function (browser) {
  //   browser
  //     .url('http://localhost:4000/login')
  //     .waitForElementVisible('body')
  //     .setValue('input[type=email]', 'uyi.sosa@gmail.com')
  //     .setValue('input[type=password]', 'password')
  //     .click('input[type="submit"]')
  //     .pause(1000)
  //     .assert.urlEquals('http://localhost:4000/')
  //     .assert.containsText('h4', 'DASHBOARD')
  //     .assert.containsText('nav', 'Doc Management')
  //     .assert.containsText('nav', 'My Documents')
  //     .assert.containsText('nav', 'Logout')
  //     .assert.elementNotPresent('#adminTab')
  //     .assert.cssClassNotPresent('nav', 'admin')
  //     .end();
  // }
};
