# Peter Jacobs - Developer Portfolio

A Jekyll-powered portfolio website showcasing web development and QA automation expertise, featuring a comprehensive Playwright testing framework.

## 🚀 Quick Start

### Development

```bash
npm install           # Install dependencies
npm run dev           # Start Jekyll development server
npm test              # Run all tests against local server
```

### Testing

```bash
# Local development testing (default)
npm test                    # All tests against local Jekyll server
npm run test:headed         # With browser UI visible
npm run test:debug          # With debugger

# Production testing
npm run test:prod           # All tests against live site
npm run test:smoke:prod     # Quick smoke tests

# Specific test types
npm run test:accessibility  # WCAG compliance testing
npm run test:performance    # Performance monitoring
npm run test:visual         # Visual regression testing
npm run test:mobile         # Mobile responsiveness
```

## 🏗️ Project Structure

```
├── _layouts/          # Jekyll layout templates
├── _includes/         # Reusable Jekyll components
├── _pages/            # Jekyll pages (blog, thank-you)
├── _posts/            # Blog posts
├── assets/            # CSS, JS, images
├── tests/             # Playwright test suite
│   ├── accessibility.spec.ts    # WCAG compliance
│   ├── performance.spec.ts      # Performance testing
│   ├── visual.spec.ts           # Visual regression
│   └── thisispeterj-website.spec.ts  # Functional tests
└── playwright.config.ts         # Test configuration
```

## 🧪 Testing Framework

Comprehensive Playwright testing covering:

- **Functional Testing**: Navigation, forms, interactive elements
- **Accessibility**: WCAG 2.1 compliance, keyboard navigation, color contrast
- **Performance**: Load times, Core Web Vitals, lighthouse scores
- **Visual Regression**: Screenshot comparison across browsers
- **Cross-browser**: Chrome, Firefox, Safari, Mobile Chrome/Safari

### Test Environments

- **Local Development**: Tests against `http://127.0.0.1:4000` (Jekyll dev server)
- **Production**: Tests against `https://thisispeterj.com` (live site)

## 🔧 Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Site Generator**: Jekyll 4.3+
- **Testing**: Playwright, axe-core
- **CI/CD**: GitHub Actions ready
- **Performance**: Lighthouse integration

## 📦 Installation

1. **Prerequisites**

   ```bash
   # Install Ruby and Bundler
   gem install bundler

   # Install Node.js and npm
   node --version  # Should be 18+
   ```

2. **Setup**

   ```bash
   git clone https://github.com/thisispeterj/thisispeterj.git
   cd thisispeterj
   bundle install    # Install Jekyll dependencies
   npm install       # Install Node dependencies
   ```

3. **Development**
   ```bash
   npm run dev       # Start Jekyll development server
   # Visit http://127.0.0.1:4000
   ```

## 🚀 Deployment

The site is automatically deployed via GitHub Pages when changes are pushed to the `main` branch.

## 📊 Testing in CI/CD

Tests run automatically in GitHub Actions:

- **PR Validation**: Local tests during pull requests
- **Production Monitoring**: Smoke tests after deployment
- **Scheduled**: Full test suite runs nightly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests: `npm test`
4. Submit a pull request

# Advanced Test Configuration

advanced configuration and CI/CD setup.

## Environment Variables

- `TEST_ENV`: Controls test environment (`"local"` | `"production"`)
- `CI`: Automatically optimizes settings for CI environments
- `LOCAL_BASE_URL`: Override local development URL
- `PRODUCTION_BASE_URL`: Override production URL

## Advanced Commands

### Targeted Testing

```bash
# Specific browsers
npm run test:chromium       # Chrome only
npm run test:firefox        # Firefox only
npm run test:webkit         # Safari only

# Test categories with production variants
npm run test:accessibility:prod
npm run test:performance:prod
npm run test:visual:prod
npm run test:mobile:prod
```

### Development & Debugging

```bash
npm run test:ui             # Interactive UI mode
npm run test:debug          # Step-by-step debugging
npm run test:update-snapshots  # Update visual baselines
npm run test:report         # View last test report
```

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
- name: Local tests
  run: npm test
- name: Production smoke tests
  run: npm run test:smoke:prod
```

## Troubleshooting

**Jekyll Server Issues**: Run `bundle install` and check port 4000 availability  
**Production Test Failures**: Verify site accessibility and SSL certificates  
**Environment Variables**: Use proper syntax for your shell (`set` on Windows, `export` on Unix)
