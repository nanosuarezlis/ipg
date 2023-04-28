// module.exports = {
//     roots: ['<rootDir>/src', '<rootDir>/__tests__', '<rootDir>/dist'],
//     testMatch: ['**/__tests__/**/*.test.tsx'],
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
//     transform: {
//       '^.+\\.(ts|tsx)$': 'ts-jest',
//     },
//     moduleNameMapper: {
//       '\\.(css|less)$': 'identity-obj-proxy',
//     },
//   };

module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src', '<rootDir>/__tests__', '<rootDir>/dist'],
  testMatch: ['**/__tests__/**/*.test.tsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
