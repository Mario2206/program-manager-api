module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  rootDir: './test/',
  setupFilesAfterEnv: ["jest-sinon"],
  runner : "groups",
  globalSetup: "./setup.js",
}
