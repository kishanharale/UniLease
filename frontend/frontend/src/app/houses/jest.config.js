module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.ts$': 'ts-jest', // Use ts-jest for TypeScript files
      '^.+\\.(js|mjs)$': 'babel-jest', // Use babel-jest for JavaScript and ES module files
    },
    moduleFileExtensions: ['ts', 'js', 'mjs', 'json'],
    transformIgnorePatterns: ['/node_modules/(?!@angular)'], // Ensure Angular files are transformed
  };