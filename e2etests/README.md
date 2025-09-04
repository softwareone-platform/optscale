# Instructions for using the Playwright e2e tests.

This directory contains end-to-end tests for the application using Playwright.
The tests are written in TypeScript and use the Playwright library to interact with the application.

## Overview
Playwright is a Node.js library that provides a high-level API to control web browsers.
It is a tool for performing both UI and API tests on web applications. It has an easy-to-use API and supports multiple browsers, including mobile devices.

Playwright has an integrated test runner that can be used to run tests in parallel, take screenshots, and generate videos of test runs.
The tests can be run locally or in a CI/CD pipeline, headless or in a browser.
Its test reporter can be used to generate reports in various formats, including JSON, JUnit, and HTML, and is highly configurable.
It is possible to record screenshots, videos, and traces of test runs, that are retained in the event of a test failure.

Visit the [Playwright website](https://playwright.dev/) for more information. Make sure you have Node.js selected in the header to see the correct documentation.

## Requirements
- Node.js 18 or later (https://nodejs.org/)

Installing Node.js will also install npm, the Node.js package manager.

## Installing dependencies
Run the following command in the `e2etests` directory to install the required dependencies:
```
npm install
```

## Installing Playwright
Run the following command in the `e2etests` directory to install Playwright:
```
npx playwright install --with-deps
```

## Environment Variables
Create a `.env.local` file in the `e2etests` directory with the following content:
```
DEFAULT_USER_EMAIL=default@user.com
DEFAULT_USER_PASSWORD=Password123!
DEFAULT_USER_ID=UserID

CLUSTER_SECRET=Password321!
# Environment: Dev [https://portal.finops.s1.today], Localhost [http://localhost:3000]
BASE_URL=[Environment]
IGNORE_HTTPS_ERRORS=true

LIVE_DEMO_API=https:[Environment]
LIVE_DEMO_TOKEN=[token]

#Set API_BASE_URL when using a Localhost
#API_BASE_URL=[Set API base url to the environment your local build is using for API calls]

# STAGING=[staging url]
USE_LIVE_DEMO=false
CLEAN_UP_DOWNLOADS=true
```

## Running Tests
Run the following command in the `e2etests` directory to run the tests:
```
npx playwright test
```
This will run all the tests in the `tests` directory.
See Testing Scripts for more options. 

## Testing Scripts
Playwright scripts in ([package.json](package.json)) can be run using the following command:
```
npm run [script name]
```
Or they can be added to the Run/Debug Configuration in an IDE like WebStorm.

### Scripts for Running Tests
These scripts facilitate running various Playwright tests to ensure the functionality and stability of the application, including API tests, screenshot matching regression tests, and end-to-end tests.
They also include options for running tests in different browsers, in headed mode, and with debugging capabilities.

| Script name                  | Description                                                                                                                                                                                                                                                                   | npm command and arguments                                                                                                  |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| playwright:test              | Runs all Playwright tests headless with configuration specified in playwright.config.ts. for all test with the @ui tag                                                                                                                                                        | ```npx playwright test --grep @ui```                                                                                       |
| playwright:headed            | Runs all Playwright @ui tests in a headed Chrome browser, with a single worker.                                                                                                                                                                                               | ```npx playwright test --headed --workers=1 --project chrome --grep @ui```                                                 |
| playwright:trace             | Opens Playwright trace viewer. See https://playwright.dev/docs/trace-viewer for a full explanation of the trace viewer.                                                                                                                                                       | ```npx playwright show-trace```                                                                                            |
| playwright:debug             | Runs Playwright tests in debug mode allowing stepping through test steps on a single worker. Best used in combination with the desired test being decorated with .only.                                                                                                       | ```npx playwright test --debug --workers=1```                                                                              |
| playwright:ui                | Runs Playwright @ui tests on Chrome in the UI mode. See https://playwright.dev/docs/test-ui-mode for full explanation of ui mode.                                                                                                                                             | ```npx playwright test --ui --project chrome --grep @ui```                                                                 |
| playwright:show-report       | Shows the report for the previous test run.                                                                                                                                                                                                                                   | ```npm playwright show-report```                                                                                           |
| playwright:codegen           | Opens the Playwright Codegen interface for recording tests steps. Useful for generating selectors for difficult to locate page objects.                                                                                                                                       | ```npx playwright codegen %BASE_URL%```                                                                                    |
| playwright:api               | Runs all test with the @api tag.                                                                                                                                                                                                                                              | ```npx playwright test --grep @api```                                                                                      |
| playwright:single-worker     | Runs all Playwright @ui tests with a single chrome worker. This overrides the configured number of workers and runs the tests serially. This is useful when running on a local build where hardware resources are limited, and can increase reliability at the cost of speed. | ```npx playwright test --workers=1 --project chrome --grep @ui```                                                          |
| playwright:test_chrome       | Runs all Playwright tests in a headless Chrome browser. playwright:test_firefox, playwright:test_edge, etc do the same for their respective browsers.                                                                                                                         | ```npx playwright test --project chrome```                                                                                 |
| playwright:regression        | Runs the regression screenshot matching tests using its own specified config.ts.                                                                                                                                                                                              | ```cross-env IS_REGRESSION_RUN=true npx playwright test --grep @swo_regression --config=playwright.regression.config.ts``` |
| playwright:regression:ui     | Runs the playwright:regression script with the --ui mode argument.                                                                                                                                                                                                            | ```npm run playwright:regression -- --ui```                                                                                |
| playwright:regression:update | Runs the playwright:regression script with the --update-snapshot argument. This tells Playwright to capture new screenshots where they do not match the existing one.                                                                                                         | ```npm run playwright:regression -- --update-snapshots```                                                                  |

### Command line instruction for Running Specific Tests or configurations
| CLI                                     | Description                                                                                                                                                               | Example npm                                         |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| npx playwright test --project "browser" | Runs tests with specified browser. Run script with --help for list of values.                                                                                             | ```npx playwright test --project "chrome"```        |
| npx playwright test testfile.spec.ts    | Runs tests within the specified spec.ts file.                                                                                                                             | ```npx playwright test example.spec.ts```           |
| npx playwright test -g "test-title"     | Runs the test with the specified title.                                                                                                                                   | ```npx playwright test -g "Main menu navigation"``` |
| npx playwright test --workers=int       | Runs tests in parallel using the number of workers specified. It is suggested that workers should not exceed 50% of the CPU cores available to prevent performance issues | ```npx playwright test --workers=4```               |

## Playwright Configuration
The default Playwright configuration is specified in the `playwright.config.ts` file. The regression tests use a separate configuration file, `playwright.regression.config.ts`, which is used to run the regression tests with specific settings.
The config file contains settings for the test runner, such as the base URL, timeout settings, and the browsers to run tests on. It can also be used to specify dependencies such as creating a user session, which is shared across tests to avoid logging in before each test.

## Setup and Teardown
Playwright provides hooks for setup and teardown functions that can be used to perform actions before and after tests.
These functions can be used to set up the test environment, such as creating test data, and to clean up the environment after the tests have run.
The `global-setup.ts` is executed before the test suite begins and is used to configure environment variables and log important test configuration details.

## Fixtures
Fixtures are used to allow tests to share page objects and methods from the page and request classes, without having to create new instances for each test.
The `page-object-fixtures.ts` also shares the user session saved as a project dependency in the playwright.config.ts file, allowing the session to be reused and negates logging in before each test.
