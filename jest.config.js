module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  rootDir: './test/',
  setupFilesAfterEnv: ["jest-sinon", "./setup.ts"],
  runner : "groups",
}
