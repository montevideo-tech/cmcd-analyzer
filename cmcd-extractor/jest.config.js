module.exports = {
  // Paths of the test files
  testMatch: ["**/test/**/*.test.js"],
  // Transformation configuration
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  // Babel configuration
  transformIgnorePatterns: ["/node_modules/"],
  // Test environment configuration
  testEnvironment: "node",
  // Reporter configuration
  reporters: ["default"]
};
