const jestNext = require("next/jest");
const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const createJestConfig = jestNext({
  dir: ".",
});
const JestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = JestConfig;
