# OptScale Regression Tests

Visual regression tests for the OptScale UI, using [Playwright](https://playwright.dev/) screenshot comparison.

## Overview

These tests capture screenshots of key UI components and compare them against stored baseline snapshots, ensuring visual consistency across releases.

Tests are tagged with `@swo_regression` and cover:

- Homepage
- Cloud Accounts
- Expenses
- Events
- Policies
- Pools
- Recommendations
- Resources
- Settings
- Users
- Common UI (header, navigation)

## Setup

### Prerequisites

- Node.js (see `.nvmrc` or use the version in `package.json` engines if present)
- A running OptScale instance

### Install dependencies

```bash
npm install
npx playwright install chromium
```

### Configure environment

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Key variables:

| Variable | Description |
|---|---|
| `BASE_URL` | URL of the OptScale instance to test |
| `DEFAULT_USER_EMAIL` | Login email for the test user |
| `LIVE_DEMO_API` | Live demo API endpoint (when using live demo) |
| `LIVE_DEMO_TOKEN` | Live demo token |
| `IGNORE_HTTPS_ERRORS` | Set to `true` to ignore HTTPS certificate errors |

## Running Tests

```bash
# Run all regression tests (headless)
npm run playwright:test

# Run with Playwright UI (interactive mode)
npm run playwright:test:ui

# Run headed (visible browser)
npm run playwright:test:headed

# Update baseline snapshots
npm run playwright:test:update
```

## Project Structure

```
regression-tests/
├── tests/              # Test specs (.spec.ts)
├── mocks/              # API mock data used by tests
├── utils/              # Shared test utilities
│   └── disable-antialiasing/  # CSS to ensure consistent screenshots
├── fixtures/           # Playwright test fixtures (page objects wiring)
├── pages/              # Page Object Models
├── types/              # TypeScript types
├── utils/              # General utilities (auth, API requests, etc.)
├── setup/              # Auth setup for Playwright
├── api-requests/       # Low-level API request helpers
├── playwright.config.ts
├── package.json
└── .env.example
```

## Snapshots

Baseline snapshots are stored in `snapshots/`. They are platform-specific (OS-named subfolders).

To regenerate all snapshots:

```bash
npm run playwright:test:update
```
