import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test("should not have accessibility violations on homepage", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should not have accessibility violations on blog page", async ({
    page,
  }) => {
    await page.goto("/blog/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    const headingLevels = await Promise.all(
      headings.map((heading) =>
        heading.evaluate((el) => parseInt(el.tagName.charAt(1)))
      )
    );

    // Should start with h1
    expect(headingLevels[0]).toBe(1);

    // Should not skip levels
    for (let i = 1; i < headingLevels.length; i++) {
      const diff = headingLevels[i] - headingLevels[i - 1];
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  test("should have keyboard navigation", async ({ page }) => {
    await page.goto("/");

    // Test tab navigation
    await page.keyboard.press("Tab");
    const firstFocusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(
      ["A", "BUTTON", "INPUT"].includes(firstFocusedElement || "")
    ).toBeTruthy();

    // Test that all interactive elements are focusable
    const interactiveElements = await page
      .locator("a, button, input, textarea")
      .all();

    for (const element of interactiveElements) {
      await element.focus();
      const isFocused = await element.evaluate(
        (el) => el === document.activeElement
      );
      expect(isFocused).toBeTruthy();
    }
  });

  test("should have proper alt text for images", async ({ page }) => {
    await page.goto("/");

    const images = await page.locator("img").all();

    for (const img of images) {
      const alt = await img.getAttribute("alt");
      const src = await img.getAttribute("src");

      // Images should have alt text (can be empty for decorative images)
      expect(alt).not.toBeNull();

      // If not decorative, should have meaningful alt text
      if (alt !== "") {
        expect(alt!.length).toBeGreaterThan(0);
        console.log(`Image ${src} has alt text: "${alt}"`);
      }
    }
  });
});
