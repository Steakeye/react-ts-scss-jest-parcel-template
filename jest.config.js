module.exports = {
  roots: ['<rootDir>/src'],
  testURL: 'https://www.test.site',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/jest/transformSCSSImport.js',
    '^.+\\.(png|jpg)?$': '<rootDir>/jest/transformAssetsToSrc.js',
    '^.+\\.svg?$': 'jest-svg-transformer',
    '.+\\.(ttf|woff|woff2)$': 'identity-obj-proxy',
  },
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [
    'jest-extended',
    'jest-date-mock',
    '<rootDir>/jest/mockFetch.js',
    '<rootDir>/jest/mockAppEl.js',
    '<rootDir>/jest/extendExpect.js',
  ],
  verbose: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  coverageDirectory: '.jest-coverage',
  coverageReporters: ['lcov'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/jest-utils/'],
};
