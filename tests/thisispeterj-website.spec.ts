import { test, expect } from "@playwright/test";

test.describe("ThisIsPeterJ Website", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto("/");
  });

  test("should load homepage with correct title and header content", async ({
    page,
  }) => {
    // Verify page title
    await expect(page).toHaveTitle("Thisispeterj");

    // Verify main heading
    await expect(
      page.getByRole("heading", { name: /Nice to meet you! I'm Peter Jacobs./ })
    ).toBeVisible();

    // Verify hero description - use partial text match
    await expect(
      page.getByText(/Based in the US, I'm a front-end developer/)
    ).toBeVisible();

    // Verify Contact Me button exists - be more specific to avoid conflicts
    await expect(
      page
        .locator("section")
        .filter({ hasText: "Nice to meet you!" })
        .getByRole("link", { name: "Contact Me" })
    ).toBeVisible();
  });

  test("should have functional navigation menu", async ({ page }) => {
    // Test Skills navigation link - verify it scrolls to the section
    await page.getByRole("link", { name: "Skills" }).click();

    // Wait for scroll animation to complete
    await page.waitForTimeout(1000);

    // Verify we're still on the same page but scrolled to skills section
    await expect(page.locator("#skills")).toBeInViewport();

    // Test Projects navigation link - check scroll position
    await page.getByRole("link", { name: "Projects" }).click();
    // Wait a moment for any scroll animation
    await page.waitForTimeout(1000);

    // Verify projects section is in viewport
    await expect(page.locator("#projects")).toBeInViewport();
    await page.waitForTimeout(500);

    // Test Contact navigation link - be specific to avoid conflicts
    await page
      .locator("nav.main-nav")
      .getByRole("link", { name: "Contact" })
      .click();
    // Wait a moment for any scroll animation
    await page.waitForTimeout(500);

    // Test Blog navigation link
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL("/blog/");
    await expect(page).toHaveTitle("Blog - Peter Jacobs");
  });

  test("should display skills section with correct technologies", async ({
    page,
  }) => {
    // Verify skill headings are visible - use exact matching to avoid conflicts with project titles
    await expect(
      page.locator(".skills").getByRole("heading", { name: "HTML" })
    ).toBeVisible();
    await expect(
      page.locator(".skills").getByRole("heading", { name: "CSS", exact: true })
    ).toBeVisible();
    await expect(
      page.locator(".skills").getByRole("heading", { name: "Javascript" })
    ).toBeVisible();
    await expect(
      page.locator(".skills").getByRole("heading", { name: "SASS" })
    ).toBeVisible();
    await expect(
      page.locator(".skills").getByRole("heading", { name: "QA Testing" })
    ).toBeVisible();
    await expect(
      page
        .locator(".skills")
        .getByRole("heading", { name: "Automated Testing" })
    ).toBeVisible();

    // Verify experience text format
    await expect(page.getByText("10 Years Experience")).toHaveCount(3); // HTML, CSS, QA Testing
    await expect(page.getByText("4 Years Experience")).toBeVisible(); // Javascript
    await expect(page.getByText("5 Years Experience")).toHaveCount(2); // SASS, Automated Testing
  });

  test("should display all project cards with correct links", async ({
    page,
  }) => {
    // Verify Projects heading
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();

    // Test project titles
    const projectTitles = [
      "Glass Dashboard",
      "Inspiration - CSS Battle Card",
      "Inspiration - Apple Bento Design",
      "Inspiration - Kyoto Studio",
      "Social Links",
      "QR Code",
      "Recipe Page",
    ];

    for (const title of projectTitles) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }

    // Verify project links have correct attributes
    await expect(
      page.getByRole("link", { name: "View Project" }).first()
    ).toHaveAttribute("target", "_blank");
    await expect(
      page.getByRole("link", { name: "View Code" }).first()
    ).toHaveAttribute("target", "_blank");
  });

  test("should have working contact form", async ({ page }) => {
    // Verify contact section heading
    await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

    // Verify contact description - the actual text based on what we saw
    await expect(
      page.getByText(
        "I'd love to connect! Whether you want to chat about developer advocacy, QA automation, Playwright, or just say hi, drop me a message and I'll get back to you soon."
      )
    ).toBeVisible();

    // Fill out the contact form
    await page.getByRole("textbox", { name: "NAME" }).fill("Test User");
    await page.getByRole("textbox", { name: "EMAIL" }).fill("test@example.com");
    await page
      .getByRole("textbox", { name: "MESSAGE" })
      .fill("This is a test message for the contact form.");

    // Verify form fields have correct values
    await expect(page.getByRole("textbox", { name: "NAME" })).toHaveValue(
      "Test User"
    );
    await expect(page.getByRole("textbox", { name: "EMAIL" })).toHaveValue(
      "test@example.com"
    );
    await expect(page.getByRole("textbox", { name: "MESSAGE" })).toHaveValue(
      "This is a test message for the contact form."
    );

    // Verify send button exists (but don't click to avoid actual submission)
    await expect(
      page.getByRole("button", { name: "SEND MESSAGE" })
    ).toBeVisible();
  });

  test("should have social media links with correct targets", async ({
    page,
  }) => {
    // Test header social links
    const socialLinks = [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/thisispeterj/" },
      { name: "GitHub", url: "https://github.com/thisispeterj" },
      { name: "CodePen", url: "https://codepen.io/thisispeterj/" },
      {
        name: "Frontend Mentor",
        url: "https://www.frontendmentor.io/profile/thisispeterj",
      },
    ];

    for (const social of socialLinks) {
      const link = page.getByRole("link", { name: social.name }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", social.url);
      await expect(link).toHaveAttribute("target", "_blank");
    }
  });

  test("should have correct footer content and copyright", async ({ page }) => {
    // Verify footer logo link
    await expect(
      page.getByRole("link", { name: "PeterJacobs" }).last()
    ).toBeVisible();

    // Verify copyright notice - exact text from the website
    await expect(
      page.getByText("© 2025 Peter Jacobs. All rights reserved.")
    ).toBeVisible();
  });
});

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog/");
  });

  test("should load blog page with correct content", async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle("Blog - Peter Jacobs");

    // Verify main heading
    await expect(
      page.getByRole("heading", { name: "Learning Out Loud" })
    ).toBeVisible();

    // Verify subtitle
    await expect(
      page.getByText(
        "Practical how-tos, lessons from QA automation, and my path into developer advocacy."
      )
    ).toBeVisible();
  });

  test("should have functional blog filter buttons", async ({ page }) => {
    // Verify all filter buttons exist
    const filterButtons = [
      "All Posts",
      "Advocacy",
      "Automation",
      "Career",
      "Development",
      "Testing",
    ];

    for (const buttonName of filterButtons) {
      await expect(
        page.getByRole("button", { name: buttonName })
      ).toBeVisible();
    }

    // Test clicking a filter button
    await page.getByRole("button", { name: "Testing" }).click();
    await expect(page.getByRole("button", { name: "Testing" })).toHaveClass(
      /active/
    );

    // Reset to All Posts
    await page.getByRole("button", { name: "All Posts" }).click();
    await expect(page.getByRole("button", { name: "All Posts" })).toHaveClass(
      /active/
    );
  });

  test("should display blog post with correct content", async ({ page }) => {
    // Verify the blog post exists
    await expect(
      page.getByRole("heading", {
        name: /My Journey to Developer Advocate: What's Coming Next/,
      })
    ).toBeVisible();

    // Verify post date
    await expect(page.getByText("September 01, 2025")).toBeVisible();

    // Verify post excerpt
    await expect(
      page.getByText(
        /As I transition into developer advocacy, I'm excited to share my expertise in QA automation and testing/
      )
    ).toBeVisible();

    // Verify tags
    const tags = ["career", "development", "advocacy", "testing", "automation"];
    for (const tag of tags) {
      await expect(page.locator(`text=${tag}`).first()).toBeVisible();
    }

    // Test clicking on the blog post
    await page
      .getByRole("link", {
        name: /My Journey to Developer Advocate: What's Coming Next/,
      })
      .click();
    await expect(page).toHaveTitle(
      /My Journey to Developer Advocate: What's Coming Next - Peter Jacobs/
    );
  });
});

test.describe("Blog Post Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      "/career/development/advocacy/testing/automation/2025/09/01/journey-to-developer-advocate.html"
    );
  });

  test("should load individual blog post correctly", async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(
      /My Journey to Developer Advocate: What's Coming Next - Peter Jacobs/
    );

    // Verify main heading
    await expect(
      page.getByRole("heading", {
        name: /My Journey to Developer Advocate: What's Coming Next/,
      })
    ).toBeVisible();

    // Verify back to blog link
    await expect(
      page.getByRole("link", { name: "← Back to Blog" })
    ).toBeVisible();

    // Verify key content sections
    await expect(
      page.getByRole("heading", { name: "Welcome to My Blog!" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "What You Can Expect" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /🎭 Playwright Deep Dives/ })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /🤖 Playwright \+ MCP Integration/ })
    ).toBeVisible();
  });

  test("should have functional navigation back to blog", async ({ page }) => {
    // Click back to blog link
    await page.getByRole("link", { name: "← Back to Blog" }).click();

    // Verify we're back on the blog page
    await expect(page).toHaveURL("/blog/");
    await expect(page).toHaveTitle("Blog - Peter Jacobs");
  });

  test("should have navigation links in footer", async ({ page }) => {
    // Test "Back to Home" link
    await expect(
      page.getByRole("link", { name: "Back to Home" })
    ).toHaveAttribute("href", "/");

    // Test "Read My Blog" link
    await expect(
      page.getByRole("link", { name: "Read My Blog" })
    ).toHaveAttribute("href", "/blog/");
  });
});

test.describe("Mobile Responsiveness", () => {
  test("should be responsive on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Verify key elements are still visible
    await expect(
      page.getByRole("heading", { name: /Nice to meet you! I'm Peter Jacobs./ })
    ).toBeVisible();
    await expect(
      page
        .locator("section")
        .filter({ hasText: "Nice to meet you!" })
        .getByRole("link", { name: "Contact Me" })
    ).toBeVisible();

    // Verify navigation is present - be specific about navigation
    await expect(page.getByRole("link", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(
      page.locator("nav.main-nav").getByRole("link", { name: "Contact" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
  });
});
