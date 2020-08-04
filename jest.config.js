// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  //automatically creating basic mocks
  automock: false,
  //clear mocks after each test
  clearMocks: true,
  //make folder with test coverage percentage
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  //do ignorowania node modulsow i helperow - tego nie chcemy testowac
  testPathIgnorePatterns: ['/node_modules/', '__tests__/helper/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)': 'identity-obj-proxy'
  },
  setupFiles: ['./setup-jest.js'],
  //resetuje mocki i moduly po kazdym tescie
  resetMocks: true,
  resetModules: true,
  //sprawdzaj czy są testy w tych folderach
  roots: [
    "<rootDir>/__tests__/unit",
    "<rootDir>/__tests__/functional",
  ]
};
