import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;
  readonly contactButton: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;
  readonly contactForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroTitle = page.getByRole("heading", {
      name: /Nice to meet you! I'm Peter Jacobs./,
    });
    this.heroDescription = page.getByText(
      /Based in the US, I'm a front-end developer/
    );
    this.contactButton = page
      .locator("section")
      .filter({ hasText: "Nice to meet you!" })
      .getByRole("link", { name: "Contact Me" });
    this.skillsSection = page.locator(".skills");
    this.projectsSection = page.locator(".projects");
    this.contactForm = page.locator("#contact-form");
  }

  async goto() {
    await this.page.goto("/");
  }

  async fillContactForm(name: string, email: string, message: string) {
    await this.page.getByRole("textbox", { name: "NAME" }).fill(name);
    await this.page.getByRole("textbox", { name: "EMAIL" }).fill(email);
    await this.page.getByRole("textbox", { name: "MESSAGE" }).fill(message);
  }

  async getSkillByName(skillName: string) {
    return this.skillsSection.getByRole("heading", {
      name: skillName,
      exact: true,
    });
  }
}

export class BlogPage {
  readonly page: Page;
  readonly title: Locator;
  readonly filterButtons: Locator;
  readonly posts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Learning Out Loud" });
    this.filterButtons = page.locator(".blog-filters button");
    this.posts = page.locator("article");
  }

  async goto() {
    await this.page.goto("/blog/");
  }

  async filterByTag(tag: string) {
    await this.page.getByRole("button", { name: tag }).click();
  }
}

export class Navigation {
  readonly page: Page;
  readonly logo: Locator;
  readonly skillsLink: Locator;
  readonly projectsLink: Locator;
  readonly contactLink: Locator;
  readonly blogLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole("link", { name: "PeterJacobs" }).first();
    this.skillsLink = page.getByRole("link", { name: "Skills" });
    this.projectsLink = page.getByRole("link", { name: "Projects" });
    this.contactLink = page
      .locator("nav.main-nav")
      .getByRole("link", { name: "Contact" });
    this.blogLink = page.getByRole("link", { name: "Blog" });
  }
}
