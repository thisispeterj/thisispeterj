import {
  Reporter,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";
import fs from "fs";
import path from "path";

interface TestMetrics {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  browsers: string[];
  testsByBrowser: { [key: string]: number };
  failureReasons: string[];
}

class CustomReporter implements Reporter {
  private results: TestResult[] = [];
  private startTime: number = 0;

  onBegin() {
    this.startTime = Date.now();
    console.log("🎭 Starting Playwright test execution...");
  }

  onTestEnd(test: TestCase, result: TestResult) {
    this.results.push(result);

    const status =
      result.status === "passed"
        ? "✅"
        : result.status === "failed"
        ? "❌"
        : result.status === "skipped"
        ? "⏭️"
        : "⚠️";

    console.log(`${status} ${test.title} (${result.duration}ms)`);

    if (result.status === "failed") {
      console.log(`   💥 ${result.error?.message || "Unknown error"}`);
    }
  }

  onEnd(result: FullResult) {
    const endTime = Date.now();
    const totalDuration = endTime - this.startTime;

    const metrics: TestMetrics = {
      totalTests: this.results.length,
      passed: this.results.filter((r) => r.status === "passed").length,
      failed: this.results.filter((r) => r.status === "failed").length,
      skipped: this.results.filter((r) => r.status === "skipped").length,
      duration: totalDuration,
      browsers: [],
      testsByBrowser: {},
      failureReasons: this.results
        .filter((r) => r.status === "failed")
        .map((r) => r.error?.message || "Unknown error"),
    };

    // Generate summary
    this.generateSummary(metrics);

    // Save detailed results
    this.saveDetailedResults(metrics);

    // Generate trends data
    this.saveTestTrends(metrics);
  }

  private generateSummary(metrics: TestMetrics) {
    const passRate = ((metrics.passed / metrics.totalTests) * 100).toFixed(1);

    console.log("\n📊 Test Execution Summary");
    console.log("========================");
    console.log(`Total Tests: ${metrics.totalTests}`);
    console.log(`✅ Passed: ${metrics.passed}`);
    console.log(`❌ Failed: ${metrics.failed}`);
    console.log(`⏭️ Skipped: ${metrics.skipped}`);
    console.log(`🎯 Pass Rate: ${passRate}%`);
    console.log(`⏱️ Duration: ${(metrics.duration / 1000).toFixed(2)}s`);

    if (metrics.failed > 0) {
      console.log("\n🐛 Failure Reasons:");
      metrics.failureReasons.forEach((reason, index) => {
        console.log(`  ${index + 1}. ${reason}`);
      });
    }
  }

  private saveDetailedResults(metrics: TestMetrics) {
    const reportDir = "test-results";
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const detailedReport = {
      timestamp: new Date().toISOString(),
      summary: metrics,
      tests: this.results.map((result, index) => ({
        title: `Test ${index + 1}`,
        status: result.status,
        duration: result.duration,
        error: result.error?.message || null,
        retry: result.retry,
      })),
    };

    fs.writeFileSync(
      path.join(reportDir, "detailed-results.json"),
      JSON.stringify(detailedReport, null, 2)
    );
  }

  private saveTestTrends(metrics: TestMetrics) {
    const trendsFile = "test-results/trends.json";
    let trends: any[] = [];

    if (fs.existsSync(trendsFile)) {
      trends = JSON.parse(fs.readFileSync(trendsFile, "utf8"));
    }

    trends.push({
      timestamp: new Date().toISOString(),
      ...metrics,
    });

    // Keep only last 50 runs
    if (trends.length > 50) {
      trends = trends.slice(-50);
    }

    fs.writeFileSync(trendsFile, JSON.stringify(trends, null, 2));
  }
}

export default CustomReporter;
