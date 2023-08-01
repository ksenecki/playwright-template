# Playwright Template

[Playwright](https://playwright.dev/) 1.36 test template.

E2E tests for `https://www.saucedemo.com/`  
REST API tests for `https://jsonplaceholder.typicode.com/`

## Project requirements

1. [Node 18+](https://nodejs.org/en/docs/)
2. [npm 9.6.7](https://www.npmjs.com/)

## How to setup the Project

1. Clone repository
2. Enter the project directory and execute `npm install` in order to install all the packages

## Install Playwright with npm

1. npm install @playwright/test
2. npx playwright install

## Starting e2e test execution

E2E tests use playground `https://www.saucedemo.com/`

- basic test execution: `npx playwright test --headed` where `tests/e2e` is a deafult directory
- run tests using npm with chromium: `npm run tests:chrome` that uses default `tests/e2e` directory
- also works for `tests:firefox` and `tests:webkit`
- test directory can be changed in `playwright.config.ts`
- it is possible to add more flags with `-- --flag`
- run tests with reporter: `npx playwright test --reporter=html`

## API tests

API tests using use [Supertest](https://www.npmjs.com/package/supertest) and `https://jsonplaceholder.typicode.com/` as a fake API

- run `npm run tests:api`
