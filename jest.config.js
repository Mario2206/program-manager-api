module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  rootDir: './test/',
  setupFilesAfterEnv: ["jest-sinon"]
}
