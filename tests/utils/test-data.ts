export const testData = {
  contact: {
    validUser: {
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message for the contact form.",
    },
    invalidEmail: {
      name: "Test User",
      email: "invalid-email",
      message: "Test message",
    },
  },

  skills: [
    { name: "HTML", experience: "10 Years Experience" },
    { name: "CSS", experience: "10 Years Experience" },
    { name: "Javascript", experience: "4 Years Experience" },
    { name: "SASS", experience: "5 Years Experience" },
    { name: "QA Testing", experience: "10 Years Experience" },
    { name: "Automated Testing", experience: "5 Years Experience" },
  ],

  projects: [
    "Glass Dashboard",
    "Inspiration - CSS Battle Card",
    "Inspiration - Apple Bento Design",
    "Inspiration - Kyoto Studio",
    "Social Links",
    "QR Code",
    "Recipe Page",
  ],

  socialLinks: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/thisispeterj/" },
    { name: "GitHub", url: "https://github.com/thisispeterj" },
    { name: "CodePen", url: "https://codepen.io/thisispeterj/" },
    {
      name: "Frontend Mentor",
      url: "https://www.frontendmentor.io/profile/thisispeterj",
    },
  ],

  blogFilters: [
    "All Posts",
    "Advocacy",
    "Automation",
    "Career",
    "Development",
    "Testing",
  ],

  viewports: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  },
};
