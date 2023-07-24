module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],

  //ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/src/test/styleMock.js',
      "^.+\\.svg$": "<rootDir>/svgTransform.js",
      setupFilesAfterEnv: ["<rootDir>/setupCryptId.js"]
  },
  globals: {
    crypto: {
      getRandomValues: (arr) => require("crypto").randomBytes(arr.length),
    },
  },
}