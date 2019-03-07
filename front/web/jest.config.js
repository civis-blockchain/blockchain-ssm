module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  collectCoverage: false,
  collectCoverageFrom: ["**/src/**/*.{ts,tsx}"],
  coverageReporters: ["json", "lcov", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 20,
      lines: 15
    }
  }
};
