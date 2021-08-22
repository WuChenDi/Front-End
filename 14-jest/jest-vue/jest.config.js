module.exports = {
  preset: "@vue/cli-plugin-unit-jest",

  testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
  collectCoverageFrom: ["**/*.{jsx,vue}", "!**/node_modules/**"],
};
