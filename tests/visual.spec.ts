import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
  test("homepage should match visual baseline", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Take full page screenshot
    await expect(page).toHaveScreenshot("homepage-full.png", {
      fullPage: true,
      mask: [
        // Mask dynamic content like timestamps
        page.locator("#current-year"),
      ],
    });
  });

  test("blog page should match visual baseline", async ({ page }) => {
    await page.goto("/blog/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("blog-page-full.png", {
      fullPage: true,
    });
  });

  test("mobile homepage should match visual baseline", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("homepage-mobile.png", {
      fullPage: true,
    });
  });

  test("contact form should match visual baseline", async ({ page }) => {
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    await expect(page.locator("#contact-form")).toHaveScreenshot(
      "contact-form.png"
    );
  });

  test("navigation hover states", async ({ page }) => {
    await page.goto("/");

    const navLinks = page.locator("nav.main-nav a");

    for (let i = 0; i < (await navLinks.count()); i++) {
      const link = navLinks.nth(i);
      await link.hover();
      await expect(link).toHaveScreenshot(`nav-link-${i}-hover.png`);
    }
  });

  test("project cards should match visual baseline", async ({ page }) => {
    await page.goto("/");
    await page.locator(".projects").scrollIntoViewIfNeeded();

    const projectCards = page.locator(".project");

    for (let i = 0; i < (await projectCards.count()); i++) {
      const card = projectCards.nth(i);
      await expect(card).toHaveScreenshot(`project-card-${i}.png`);
    }
  });
});
