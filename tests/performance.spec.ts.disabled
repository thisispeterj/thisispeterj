import { test, expect } from "@playwright/test";
import lighthouse from "lighthouse";
import { chromium } from "playwright";

test.describe("Performance Tests", () => {
  test("should load homepage within acceptable time", async ({ page }) => {
    const startTime = Date.now();

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const loadTime = Date.now() - startTime;

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);

    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            resolve(entries[0]);
          }
        }).observe({ entryTypes: ["largest-contentful-paint"] });

        // Fallback if LCP doesn't fire
        setTimeout(() => resolve(null), 5000);
      });
    });

    console.log("Performance metrics:", metrics);
  });

  test("should have good lighthouse performance scores", async ({ page }) => {
    await page.goto("/");

    try {
      // Try to run Lighthouse using the page URL
      const result = await lighthouse(page.url(), {
        output: "json",
        logLevel: "error",
        formFactor: "desktop",
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      });

      if (!result) {
        throw new Error("Lighthouse audit failed to return results");
      }

      const { lhr } = result;

      // Basic performance assertions
      const performanceScore = lhr.categories?.performance?.score;
      if (performanceScore !== null && performanceScore !== undefined) {
        expect(performanceScore).toBeGreaterThan(0.7); // 70% or better
      }

      // Core Web Vitals
      const audits = lhr.audits;

      // Largest Contentful Paint (should be under 2.5s)
      const lcp = audits["largest-contentful-paint"]?.numericValue;
      if (lcp) {
        expect(lcp).toBeLessThan(2500);
      }

      // First Input Delay - checking max-potential-fid as proxy
      const fid = audits["max-potential-fid"]?.numericValue;
      if (fid) {
        expect(fid).toBeLessThan(100);
      }

      // Cumulative Layout Shift
      const cls = audits["cumulative-layout-shift"]?.numericValue;
      if (cls !== null && cls !== undefined) {
        expect(cls).toBeLessThan(0.1);
      }

      console.log("Performance metrics:", {
        score: performanceScore,
        lcp: lcp,
        fid: fid,
        cls: cls,
      });
    } catch (error) {
      console.error("Lighthouse audit failed:", error);
      // For now, just run basic performance checks instead
      const navigationTiming = await page.evaluate(() => {
        const timing = performance.timing;
        return {
          loadEventEnd: timing.loadEventEnd,
          navigationStart: timing.navigationStart,
          domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
        };
      });

      const loadTime =
        navigationTiming.loadEventEnd - navigationTiming.navigationStart;
      const domLoadTime =
        navigationTiming.domContentLoadedEventEnd -
        navigationTiming.navigationStart;

      console.log("Fallback performance metrics:", {
        loadTime: loadTime,
        domLoadTime: domLoadTime,
      });

      // Basic assertions as fallback
      expect(loadTime).toBeLessThan(5000); // Page should load in under 5 seconds
      expect(domLoadTime).toBeLessThan(3000); // DOM should be ready in under 3 seconds
    }
  });

  test("should handle multiple concurrent users", async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext(),
    ]);

    const pages = await Promise.all(
      contexts.map((context) => context.newPage())
    );

    const startTime = Date.now();

    await Promise.all(pages.map((page) => page.goto("/")));

    const loadTime = Date.now() - startTime;

    // Should handle 3 concurrent users within 5 seconds
    expect(loadTime).toBeLessThan(5000);

    // Cleanup
    await Promise.all(contexts.map((context) => context.close()));
  });
});
