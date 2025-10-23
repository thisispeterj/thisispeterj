import { defineConfig, devices } from "@playwright/test";

/**
 * Environment-based configuration
 * - Local development: npm run test (uses local Jekyll server)
 * - Production testing: npm run test:prod (uses live site)
 * - CI/CD: npm run test:ci (uses appropriate environment based on CI environment)
 */

const isProduction = process.env.TEST_ENV === "production";
const isCI = !!process.env.CI;
const localBase = process.env.LOCAL_BASE_URL || "http://127.0.0.1:4000";

// Environment-specific configuration
const config = {
  local: {
    baseURL: localBase,
    webServer: {
      command: "bundle exec jekyll serve",
      url: localBase,
      reuseExistingServer: !isCI,
      timeout: 120 * 1000, // 2 minutes for Jekyll to start
    },
  },
  production: {
    baseURL: "https://thisispeterj.com",
    webServer: undefined, // No local server needed for production tests
  },
};

const currentConfig = isProduction ? config.production : config.local;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,

  /* Enhanced reporting configuration */
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: isCI ? "never" : "on-failure",
      },
    ],
    isCI ? ["github"] : ["dot"],
  ],

  /* Output directory for test artifacts */
  outputDir: "test-results/",

  /* Global test timeout */
  timeout: 30 * 1000,

  /* Expect timeout for assertions */
  expect: {
    timeout: 5000,
  },

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: currentConfig.baseURL,

    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",

    /* Record videos on failure */
    video: "retain-on-failure",

    /* Take screenshot on failure */
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: isCI
    ? [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
      ]
    : [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
        { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
        { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
      ],

  /* Run your local dev server before starting the tests */
  webServer: currentConfig.webServer,
});
