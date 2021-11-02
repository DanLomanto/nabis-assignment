# Nabis Test Automation Assignment

This is a test assignment written by Dan Lomanto to showcase the possibility of what an E2E test automation framework might look like for the Nabis application. The following languages/libraries are being used:

- Node.js/Typescript
- WebdriverIO (https://webdriver.io/)
- Mocha (built into WebdriverIO but documentation can be found here: https://mochajs.org/)

## Pre-Requisities

The following software/libraries needs to be installed:

- Chrome needs to be installed on your machine, specifically version 95 (the current latest).
- NodeJS - This project is using node `v16.13.0`

## Setup

To setup the framework on your local machine, simply run:
<br>
`npm install`

## Organization

### Page Objects

`Page Objects` are the way that tests interact with individual pages or components within the app. It's a very common design pattern used in E2E test automation to keep things `DRY`. More info about Page Objects can be found here: https://martinfowler.com/bliki/PageObject.html

### Tests

All of the tests are created under the `test` directory in one of the following directories:

- `smoketest` - These are tests that are checking to make sure systems are operational, nothing more. They are meant to be as fast as possible to give quick feedback.
- `happypath` - These are tests that exercise the most crucial parts of your system. The straight through paths in your application that are most common for users.
- `regression` - Everything else. This includes both test scenarios that aren't as common for users, but also negative test cases to make sure the app handles invalid data/operations.

### Automatic Test Retries

All tests are currently configured to rerun `1 time` if the intial execution of a test fails for some reason. This is to help reduce some false negatives that are sometimes inherint with E2E tests.

## Debugging a test

If you are editing the tests with VSCode, then there is a built-in debugger that I have created so that you can step through an individual or set of tests.

Before actually debugging a test though, we need to set what environment to point to. To do this, do the following:

1. In the root of the repo, you'll see a file called `.env.template`.
2. Copy the file and name it `.env`.
3. In this file you'll see an environment variable called `NODE_CONFIG_ENV`. This variable tells the tests what environment we should be running against. Valid options for this variable are:
   - `default` (to run against local)
   - `staging` (to run against the staging environment)
   - `prod` (to run against prod)

Now, to debug a single test:

1. Open the file that contains the test.
2. Add the `.only` extension to your test declaration.

```
it.only('This is an example test', async () => {

   // Test goes here

});
```

3. Now start the debugger called `Debug Current File`.
   You'll now be able to set breakpoints in the code and step through the test line by line.

## Running tests via CLI

To run tests via the CLI (ie. in a build system) there are few different commands that are setup.

For running tests against your local machine:

- `npm run tests:e2e:local` - Runs all of the tests against your local environment
- `npm run tests:e2e:local:smoketest` - Runs all of the smoketests against your local environment
- `npm run tests:e2e:local:happypath` - Runs all of the happypath tests against your local environment
- `npm run tests:e2e:local:regression` - Runs all of the regression tests against your local environment

For running tests against production:

- `npm run tests:e2e:prod` - Runs all of the tests against production
- `npm run tests:e2e:prod:smoketest` - Runs all of the smoketests against production
- `npm run tests:e2e:prod:happypath` - Runs all of the happypath tests against production
- `npm run tests:e2e:prod:regression` - Runs all of the regression tests against production

## Learnings

There is one very considerable way to make both the creation of E2E tests easier and to make tests more reliable. That is by adding test id's throughout the application. Currently there aren't many so it's difficult to create element selectors in page objects that are reliable and resilient.
<br><br>
This will make the test code cleaner because then we don't have to rely on things like element types, class names (that change often) or on other element attributes.
<br><br>
The adding of test id's also makes things more reliable because these test id's will rarely change. If we use things like element class names, tests will be vert brittle and break constantly.
<br><br>
So what does adding test id's look like?
<br>
I would go into the app code and add an attribute called `data-testid` to different pages & components, like the following:

```
<button class="ui button primary large" data-testid="age-restriction-enter-btn">Enter</button>

```

## Future Work

### Reporting

There is some very basic spec reporting that's supported right now in the test framework, but I would add the following things in the future:

- `HTML Report`: this would be a report generated that would show the following things for each test:
  - Test Status (Passed/Failed/Skipped)
  - Step-by-step log of the test execution (useful for creating Steps to Reproduce)
  - If the test failed:
    - A screenshot of the app in it's failure state.
    - A video of the test execution so we can easily tell what happened.
- `Slack Notifications`: This is to notify the team as quickly as possible the results of the tests from CI/CD. This would give both a brief summary of the test results but also a link to the full HTML Report from above. The primary reason for this though is to create a quick feedback loop for developers. So they know as quickly as possible when something is in a good state or not.
- `Test Result Logging`: This is for more QA purposes, but I would like to log all test results to a central datastore (ie. ELK) so that I could run different queries to find out things like:
  - Which tests are failing the most often (so we can make those more reliable)?
  - Which tests take the longest to execute?
  - In what areas of the application are things failing most often?
  - How often are tests being run?
  - This could also be used for health monitoring of systems
  - etc.
