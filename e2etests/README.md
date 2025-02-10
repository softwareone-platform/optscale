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
DEFAULT_USER_EMAIL=[default user email]
DEFAULT_USER_PASSWORD=[password]
CLUSTER_SECRET=[password]
BASE_URL=http:[URL for instance under test]
IGNORE_HTTPS_ERRORS=true
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
These scripts facilitate running various tests to ensure the functionality and stability of the application, including unit tests, integration tests, and end-to-end tests.

| Script name                             | Description                                                                                                                                                               | Example npm                                         |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| playwright:test                         | Runs all Playwright tests headless with configuration specified in playwright.config.ts.                                                                                  | ```npx playwright test```                           |
| playwright:headed                       | Runs all Playwright tests in a browser.                                                                                                                                   | ```npx playwright test --headed```                  |
| playwright:trace                        | Runs all Playwright tests with a trace viewer.                                                                                                                            | ```npx playwright show-trace```                     |
| playwright:debug                        | Runs Playwright tests in debug mode allowing stepping through test steps.                                                                                                 | ```npx playwright test --debug```                   |
| playwright:ui                           | Runs Playwright tests in UI mode.                                                                                                                                         | ```npx playwright test --ui```                      |
| playwright:show-report                  | Shows the report for the previous test run.                                                                                                                               | ```npm playwright show-report```                    |
| playwright:codegen                      | Opens the Playwright Codegen interface for recording tests steps. Useful for generating selectors for difficult to locate page objects.                                   | ```npx playwright codegen [Base URL]```             |

### Command line instruction for Running Specific Tests or configurations
| CLI                                     | Description                                                                                                                                                               | Example npm                                         |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
| npx playwright test --project "browser" | Runs tests with specified browser. Run script with --help for list of values.                                                                                             | ```npx playwright test --project "chrome"```        |
| npx playwright test testfile.spec.ts    | Runs tests within the specified spec.ts file.                                                                                                                             | ```npx playwright test example.spec.ts```           |
| npx playwright test -g "test-title"     | Runs the test with the specified title.                                                                                                                                   | ```npx playwright test -g "Main menu navigation"``` |
| npx playwright test --workers=int       | Runs tests in parallel using the number of workers specified. It is suggested that workers should not exceed 50% of the CPU cores available to prevent performance issues | ```npx playwright test --workers=4```               |

## Playwright Configuration
The Playwright configuration is specified in the `playwright.config.ts` file.

## Setup and Teardown
Playwright provides hooks for setup and teardown functions that can be used to perform actions before and after tests.
These functions can be used to set up the test environment, such as creating test data, and to clean up the environment after the tests have run.