module.exports = {
  roots: ["<rootDir>/test"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@useActions(.*)$": "<rootDir>/src/useActions$1",
    "^@useLoading(.*)$": "<rootDir>/src/useLoading$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
  },
  testEnvironment: "jsdom",
};
